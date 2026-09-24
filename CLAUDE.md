# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static site ("Economia Brasileira em Números") presenting Brazil's economy and public
accounts for 2016/2019/2022/2025, built from two hand-curated Excel workbooks
(`Brasil_2016_2019_2022_2025.xlsx`, fiscal/R$/%PIB; `Relatorio_quantitativo_2016_2019_2022_2025.xlsx`,
complementary non-monetary indicators — LOA by ministry/GND, public-security statistics,
intergovernmental transfers, school/Enem/Sisu numbers). No framework, no build step, no
package manager — plain HTML/CSS/JS served from `docs/`, plus a Python script that
flattens both workbooks into one JS data file. Charts via Chart.js (CDN). See
`README.md` for the user-facing feature list (pages, unit toggle, dark mode, CSV export,
mobile drawer menu).

## Commands

Regenerate `docs/data/dados.js` after editing the workbook:
```bash
pip install openpyxl
python scripts/gerar_dados.py
```
The workbook must have formulas' cached values saved (open + save in Excel if it was
produced by a script without a calc engine) — `gerar_dados.py` reads with `data_only=True`.

Run locally:
```bash
python -m http.server -d docs 8000   # or just open docs/index.html directly
```

There is no test suite, linter, or bundler in this repo — don't go looking for one.
A quick sanity check after editing any of the `docs/js/*.js` content files is to run
them under Node and confirm every indicator reference resolves (adapt as needed):
```js
global.window = {};
require("./docs/data/dados.js"); require("./docs/js/paginas.js");
require("./docs/js/avaliacoes.js"); require("./docs/js/leituras.js"); require("./docs/js/checagem.js");
// then walk window.PAGINAS and confirm each {r:[aba,cod,estagio?]} resolves in window.DADOS.abas
```

## Architecture

**Data pipeline:** two workbooks (one sheet per theme, Portuguese column headers, values
for 2016/2019/2022/2025) → `scripts/gerar_dados.py` → single global `window.DADOS = {...}`
written to `docs/data/dados.js`. `DADOS.abas.<chave>.linhas` is a flat list of rows per
sheet, each with `cod`, `nome`, `estagio` (budget stage or concept), `unidade`, `v[4]`
(raw values by year), `fontes`, `classe`, `obs`. `ABAS` (main workbook) and `ABAS_QUANT`
(complementary workbook) in `gerar_dados.py` map the internal key (`"pib"`, `"receitas"`,
`"afirmativas"`, `"seg_dados"`, `"federativo"`, …) to each sheet's real name — that
mapping is the source of truth for which sheet backs which key, and for which workbook a
key comes from. Both dicts feed the *same* `aba_tematica()` parser (identical row
schema in both workbooks), with one normalization difference: the complementary
workbook stores "%"-unit cells 0–100 (e.g. `97.0` = 97%) while the main workbook stores
them 0–1 (fraction) — `aba_tematica(..., pct_0a100=True)` divides by 100 for the
complementary workbook's rows so the whole site can assume the fraction convention.
Don't "fix" this by touching `converte()`/`tipo()` in `app.js`; the normalization belongs
in the extraction step. `CORRECOES` in `gerar_dados.py` patches two known data-entry bugs
in the main workbook (see README's "Correções em relação à planilha" — don't
re-introduce them if the workbook is regenerated upstream). `fontes()`'s source-ID regex
matches any 1–2 letters + digits (`S01`, `Q01`, `SP01`, `F01`, `C01`) since each workbook
uses its own ID prefix; `main()` merges all three workbooks' `fontes`/`tentativas` lists
(only the main workbook has a "Regras metodológicas" section, so only its `regras` are
kept). The third workbook, `Corrupcao_2016_2019_2022_2025.xlsx`, is Claude's own
web-research output (built by `build_corrupcao.py`, at the repo root next to the other
`build_*.py` generators) rather than something the project owner supplied — see that
script's own docstring for why it's unusually sparse (no single official source has a
comparable 4-year series for corruption) and don't backfill its "não localizado" cells
with recalled/unsourced numbers.

**Script load order matters** (see `docs/index.html`): `dados.js` → `paginas.js` →
`guia.js` → `avaliacoes.js` → `leituras.js` → `checagem.js` → `beneficiarios.js` →
`fatooufake.js` → `app.js`. Each of the first seven just assigns a `window.*` global
inside an IIFE; `app.js` is the only one with behavior and expects all the others to
already exist on `window`.

**Two pages opt out of the indicator/spreadsheet model entirely** — `guia` (id `guia`,
menu "Como usar", `docs/js/guia.js` → `window.GUIA`) and `fato_ou_fake` (see below) —
both are pure `html`-block pages (no `kpis`/`graficos`/`tabela`, no `DADOS.abas` entry,
no avaliação/beneficiarios/leituras/checagem block). `guia` is also the site's default
route: `rota()` in `app.js` falls back to `#guia`, not `#visao`, when the URL has no
hash — a first-time visitor lands on the guide, not the data. Its "Para onde ir" level
is a grid of tip cards (`window.GUIA.grupos[].dicas[]`, rendered by `secaoDicas()` in
`app.js`) that double as a sitemap: each links straight to a page via a plain `<a
href="#pageid">`, which the existing `hashchange` listener already handles with no
extra wiring. When adding a new page, add one tip here too so it's reachable from the
guide, and keep the "18 páginas"/list-of-areas prose in `guia.js` and `README.md` in
sync with the actual page count.

**Content model — five parallel data-driven files keyed by page id**, merged at render
time, plus the two pages above that opt out of it entirely:
- `docs/js/paginas.js` (`window.PAGINAS`) — the actual page/level/chart/KPI structure.
  Each page has an `id`, `menu` label, and `niveis` (levels, rendered top-to-bottom:
  biggest aggregate first, detail last). A level can carry `kpis`, `graficos`, `tabela`,
  or a named `html` block (see `HTML{}` in `app.js` for `sintese`/`fontes`/etc.).
- `docs/js/avaliacoes.js` (`window.AVALIACOES[id]`), `docs/js/beneficiarios.js`
  (`window.BENEFICIARIOS[id]`), `docs/js/leituras.js` (`window.LEITURAS[id]`),
  `docs/js/checagem.js` (`window.CHECAGEM[id]`) — optional editorial content per page
  (impact assessment cards, "who wins/who loses" stakeholder cards, "liberal vs.
  desenvolvimentista" framings, and political-narrative fact-checks with an
  international-reference-country mirror). `app.js`'s `renderiza()` splices a synthetic
  level into `pg.niveis` for whichever of these four exist for that page id, in a fixed
  order (avaliação → quem ganha/perde → duas leituras → narrativas × dados), each
  positioned right before the "tabela completa" level if there is one (the "visão geral"
  page is special-cased to slot avaliação in right after its first level instead, since
  it has no tabela level). To add any of these four blocks to a new page, just add an
  entry under that page's id in the relevant file — no change to `app.js` needed.
- **`docs/js/checagem.js` vs. `docs/js/fatooufake.js` — don't conflate the two.**
  `checagem.js` holds *this site's own* verdicts on recurring political narratives,
  derived strictly from the spreadsheet data (see the editorial-constraint note below).
  `fatooufake.js` (page id `fato_ou_fake`) is different in kind: it never gives its own
  verdict, only curates verdicts *external fact-checking organizations* (Aos Fatos,
  Agência Lupa, Comprova, …) already published, each item carrying that org's own label
  and a link to the original check. It's not spreadsheet-driven at all — no
  `DADOS.abas` entry backs it — and it's the one page with no avaliação/beneficiarios/
  leituras/checagem block. Rendered via four dedicated `HTML{}` entries
  (`fato_urnas`/`fato_lula`/`fato_flavio`/`fato_viral`) calling a shared `secaoFato(id)`
  helper in `app.js`, one per `window.FATOOUFAKE.secoes[]` entry. Given this covers an
  in-progress election, never backfill it with an un-cited claim or a same-site verdict
  on something no external checker has verified yet — that's the one hard rule specific
  to this file.
- **Editorial constraint on `checagem.js`:** verdicts ("procede" / "procede em parte" /
  "não procede") must follow strictly from the spreadsheet data and the reference-country
  comparisons — never from balancing the scoreboard between the two political sides.
  Don't drop or swap a claim just to even out how many "procede"/"não procede" each side
  gets; a lopsided tally is expected and correct if that's what the data shows. This was
  an explicit, repeated correction from the project owner — see the file's own header
  comment.

**Indicator references** are the glue between `paginas.js` and the data: `{ r: [aba,
cod, estagio?] }` looks up one row via `acha()` in `app.js` (matches `cod` exactly,
`estagio` by prefix — used to pick one stage, e.g. `"Pago"`, out of a multi-stage
budget-execution line). Two computed forms exist instead of `r`: `{ calc: "resto",
base: [...], menos: [[...], ...] }` (base minus a list of other rows, same units) and
`{ calc: "razao", num: [...], den: [...] }` (ratio, forced to `%`). `estagios(aba, cod)`
and `estagiosPA(aba, cod)` in `paginas.js` are helpers that expand one `cod` into its
five budget-execution stages (they differ because the RTN-sourced sheets and the
Portal-da-Transparência-sourced `afirmativas` sheet use different stage labels).

**Unit conversion is centralized** in `converte()` in `app.js`: every value carries a
detected type (`brl`, `usd`, `pct`, `pessoas`, `mipessoas`, `brlmes`, …) and is rendered
in one of three global modes (nominal / real, IPCA-deflated to Dec/2025 via
`DADOS.parametros.fator` / % of GDP via `DADOS.parametros.pib` or `pib_usd`) — the mode
is a single piece of top-bar state (`est.modo`), not a per-chart setting. When adding a
new indicator, get its unit string right in `gerar_dados.py`/the workbook; `tipo()` in
`app.js` dispatches on that string.

**Tables can span multiple sheets.** `tabela()`'s argument is a list where each item is
either a sheet key (string, whole sheet) or `{ chave, titulo, subtitulo, linhas: [[aba,
cod], ...] }` to hand-pick rows from several sheets into one consolidated table (used by
the "Educação" page, which pulls specific rows out of `social`, `despesas`, and
`afirmativas` in *addition* to its own two whole sheets, `edu_matriculas` and
`enem_sisu` — a `tabela` array can freely mix both forms). `resolveTabela()` in `app.js`
normalizes both forms. Pages routinely mix indicator refs across sheets *and across
workbooks* this way — e.g. the "Federativo" page charts `despesas/11.5` (main workbook)
next to `federativo/3.1` (complementary workbook) on the same chart; `acha()`/`serie()`
don't care which workbook a sheet came from, only `DADOS.abas.<chave>`.

**Chart rendering** (`grafico()` in `app.js`) takes a `tipo` (`"barras"`, `"linhas"`,
`"empilhado"`, `"categorias"`) plus a `series` list of indicator references and builds
one Chart.js config; color comes from the CSS custom properties (`--s1..--s8` categorical,
`--r1..--r5` sequential "rampa" for year/stage series) read live via `getComputedStyle`,
so light/dark theming needs no JS changes — only the CSS variables in `docs/css/style.css`
under `:root`, the `prefers-color-scheme: dark` block, and `:root[data-theme="dark"]`.

**Root-level clutter:** besides the live pipeline (all three workbooks,
`scripts/gerar_dados.py`, `docs/`), the repo root has several one-off/legacy *generator*
scripts used to build the workbooks themselves — `build.py`, `build4.py`,
`build_2016_2019_2022_2025.py`, `build_quantitativo.py`, `build_corrupcao.py`,
`aff_block.py`, `patch_aff.py`, `patch_edu.py`, `sintese*.txt` — plus raw scraped source
files for a *further, still-unintegrated* extension (`fundeb2022.xls`/`fundeb2025.xls`,
`cosems_sus.txt`, `ipea_fns2016.txt`, `search_fundeb2019.html`). None of these scripts or
raw scrapes are read by `gerar_dados.py` or referenced by the site at runtime — only the
three `.xlsx` files they produce (named in `XLSX`/`XLSX_QUANT`/`XLSX_CORRUP` in
`gerar_dados.py`) are live inputs. `build_corrupcao.py` is the one exception worth
re-running rather than treating as pure history: unlike the other generators (one-off,
tied to a specific past research pass), it's the reproducible source of an actively thin,
gap-heavy workbook — re-run it (after editing its hardcoded `LINHAS`) if better-sourced
corruption data turns up later.
