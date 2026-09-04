# quarto-cli-multi

quarto-dev/quarto-cli 의 포크. 요청마다 뜨고 죽는 CLI 를 세션 워커로 상주하는 조판기로 바꾼 것이 이 포크의 정체성이며, 이름의 multi 가 그것을 말한다 — 여러 사용자 세션이 각자의 워커와 캐시를 갖는다.

| 원격 | 주소 | 역할 |
| --- | --- | --- |
| upstream | https://github.com/quarto-dev/quarto-cli.git | 원저작물. 조판 버그 수정만 선별 패치로 들여온다 |
| origin | https://github.com/joygram/quarto-cli-multi.git | 이 포크의 정본 |

기준점: 태그 `v1.10.18` (DeukWriter vendor/tools 와 같은 판).

아키텍처(`src/command`·`src/core`·상주 모드·세션 캐시 경계)는 이 포크가 고치고 업스트림에 되보내지 않는다. `src/resources/filters` 와 `src/resources/pandoc` 의 조판 lua 는 업스트림 정본을 그대로 두며, 판올림은 머지가 아니라 그 나무의 패치 반입이다.

라이선스는 원저작물의 MIT License (Copyright (c) 2020-2026 Posit Software, PBC) 를 계승한다.
