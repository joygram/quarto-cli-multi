/*
 * cmd.ts
 *
 * quarto multi — 요청마다 프로세스를 띄우지 않고 세션 단위로 상주하는 조판 워커.
 */

import { Command } from "cliffy/command/mod.ts";
import { dirname, relative } from "../../deno_ral/path.ts";
import { info } from "../../deno_ral/log.ts";

import { fixupPandocArgs, parseRenderFlags } from "../render/flags.ts";
import { renderResultFinalOutput } from "../render/render.ts";
import { render } from "../render/render-shared.ts";
import { renderServices } from "../render/render-services.ts";
import { notebookContext } from "../../render/notebook/notebook-context.ts";

interface RenderAsk {
  input: string;
  args?: string[];
}

interface RenderSaid {
  output: string | undefined;
  ms: number;
  served: number;
}

let served = 0;

async function renderOnce(ask: RenderAsk): Promise<RenderSaid> {
  const from = performance.now();
  const args = ask.args ?? [];
  const flags = await parseRenderFlags(args);
  const pandocArgs = fixupPandocArgs(args, flags);
  const services = renderServices(notebookContext());
  try {
    const result = await render(ask.input, {
      services,
      flags,
      pandocArgs,
      useFreezer: false,
      setProjectDir: true,
    });
    if (result.error) {
      result.context.cleanup();
      throw result.error;
    }
    const output = renderResultFinalOutput(result, dirname(ask.input));
    result.context.cleanup();
    served += 1;
    return { output, ms: performance.now() - from, served };
  } finally {
    services.cleanup();
  }
}

function memory() {
  const usage = Deno.memoryUsage();
  return { rssMb: Math.round(usage.rss / 1048576), heapMb: Math.round(usage.heapUsed / 1048576) };
}

export const multiCommand = new Command()
  .name("multi")
  .option("-p, --port <port:number>", "TCP port to listen on.", { default: 19420 })
  .option("--host <host:string>", "Host to bind to.", { default: "127.0.0.1" })
  .description("Stay resident and render on request (session worker).")
  // deno-lint-ignore no-explicit-any
  .action(async (options: any) => {
    const port = Number(options.port);
    const host = String(options.host);
    let turn: Promise<unknown> = Promise.resolve();
    const server = Deno.serve({ port, hostname: host }, async (req) => {
      const at = new URL(req.url).pathname;
      if (at === "/health") {
        return Response.json({ ok: true, served, ...memory() });
      }
      if (at === "/render" && req.method === "POST") {
        const ask = await req.json() as RenderAsk;
        const done = turn.then(() => renderOnce(ask));
        turn = done.catch(() => undefined);
        try {
          const said = await done;
          return Response.json({ ...said, ...memory() });
        } catch (failed) {
          return Response.json({ error: String((failed as Error).message ?? failed) }, { status: 500 });
        }
      }
      if (at === "/shutdown" && req.method === "POST") {
        queueMicrotask(() => server.shutdown());
        return Response.json({ stopping: true });
      }
      return new Response("not found", { status: 404 });
    });
    info(`quarto multi listening on http://${host}:${port} (cwd ${relative(Deno.cwd(), Deno.cwd()) || "."})`);
    await server.finished;
  });
