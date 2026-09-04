<!-- -*- mode: gfm -*- -->
[![GitHub Release](https://img.shields.io/github/v/release/quarto-dev/quarto-cli)](https://github.com/quarto-dev/quarto-cli/releases/latest)
[![GitHub PreRelease](https://img.shields.io/github/v/release/quarto-dev/quarto-cli?include_prereleases&label=prerelease)](https://github.com/quarto-dev/quarto-cli/releases/)
[![Build Installers](https://github.com/quarto-dev/quarto-cli/actions/workflows/create-release.yml/badge.svg)](https://github.com/quarto-dev/quarto-cli/actions/workflows/create-release.yml)
[![Parallel Smokes Tests](https://github.com/quarto-dev/quarto-cli/actions/workflows/test-smokes-parallel.yml/badge.svg)](https://github.com/quarto-dev/quarto-cli/actions/workflows/test-smokes-parallel.yml)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/quarto-dev/quarto-cli)

# Quarto

Quarto is an open-source scientific and technical publishing system built on [Pandoc](https://pandoc.org). Quarto documents are authored using [Markdown](https://en.wikipedia.org/wiki/Markdown), an easy to write plain text format.

In addition to the core capabilities of Pandoc, Quarto includes:

1.  Embedding code and output from Python, R, Julia, and JavaScript via integration with [Jupyter](https://jupyter.org/), [Knitr](https://yihui.org/knitr/), and [Observable](https://github.com/observablehq/).

2.  A variety of extensions to Pandoc Markdown useful for technical writing including cross-references, sub-figures, layout panels, hoverable citations and footnotes, callouts, and more.

3.  A project system for rendering groups of documents at once, sharing options across documents, and producing aggregate output like [websites](https://quarto.org/docs/websites/) and [books](https://quarto.org/docs/books/).

4.  Authoring using a wide variety of editors and notebooks including [JupyterLab](https://quarto.org/docs/tools/jupyter-lab.html), [RStudio](https://quarto.org/docs/tools/rstudio.html), and [VS Code](https://quarto.org/docs/tools/vscode.html).

5.  A [visual Markdown editor](https://quarto.org/docs/visual-editor/) that provides a productive writing interface for composing long-form documents.

Learn more about Quarto at <https://quarto.org>.

## Development Version

To install the development version of the Quarto CLI, clone the `quarto-cli` repository then run the configure script for your platform (`configure.sh` for Linux/macOS or `configure.cmd` for Windows). For example:

```bash
git clone https://github.com/quarto-dev/quarto-cli
cd quarto-cli
./configure.sh
```

The `./configure.sh` script should add a symlink to `quarto` to your path. You can also run quarto by running `package/dist/bin/quarto`.

To update to the latest development version, run `git pull` from the local repo directory:

```bash
cd quarto-cli
git pull
```

## Running Tests

To run all unit tests, execute the script in the test directory.

```bash
cd tests
./run-tests.sh
```

To run a specific unit test, specify the script name.

```bash
cd tests
./run-tests.sh smoke/extensions/extension-render-doc.test.ts
./run-tests.sh smoke/extensions/
```

## License <a name="license-1-ov-file"/>

Quarto is open source software available under the MIT license (<https://opensource.org/license/mit/>).

## quarto-cli-multi

이 저장소는 quarto-dev/quarto-cli 의 포크 **quarto-cli-multi** 다. 요청마다 뜨고 죽는 CLI 를 사용자 세션마다 배정되는 상주 워커로 바꾼 것이 이 포크의 정체성이며, 이름의 multi 가 그것을 말한다 — 여러 사용자 세션이 각자의 워커와 캐시를 갖는다. 상주 모드·세션별 캐시 경계·워커 수명은 이 포크가 소유하고, 조판을 맡는 Lua 필터와 pandoc 자원은 업스트림 정본을 그대로 두며 조판 버그 수정만 선별해 들여온다. 원격·기준점·반입 규칙은 [ORIGIN.md](ORIGIN.md)에 있다.

이 포크는 AI 와 함께 개선한다. 설계·구현·검증을 AI 에이전트와 사람이 같은 저장소에서 주고받으며, 판단의 근거와 실측은 커밋과 티켓에 남긴다.
