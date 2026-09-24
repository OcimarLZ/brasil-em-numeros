# Economia Brasileira em Números

Site estático que apresenta a economia e as contas públicas do Brasil em
2016, 2019, 2022 e 2025, a partir de três planilhas: `Brasil_2016_2019_2022_2025.xlsx`
(fiscal, valores em R$/%PIB), `Relatorio_quantitativo_2016_2019_2022_2025.xlsx`
(complementar: LOA por órgão/GND, segurança pública, pacto federativo e educação em
números — matrículas, rendimento, Enem, Sisu) e `Corrupcao_2016_2019_2022_2025.xlsx`
(percepção e apuração — ver ressalva sobre essa aba mais abaixo). Cada área desce do
dado agregado (PIB, arrecadação, dívida) até o segmento.

**Áreas (menu):** Como usar · Visão geral · PIB e produção · Receitas · Despesas ·
Dívida e juros · Orçamento · Pacto federativo · Áreas sociais · Segurança pública ·
Educação · Políticas afirmativas · Corrupção · Fato ou Fake · Fomento · Emprego ·
Setor externo · Investimento · Fontes.

A primeira área, **"Como usar"**, é um guia rápido (não vem de planilha): explica o que
o site mostra, como funcionam o seletor Nominal/Real/%PIB, as tabelas e o menu, a
estrutura padrão de cada página, e termina numa grade de "dicas" — uma pergunta por
página, cada uma com um link direto para a área correspondente (`#id`). É a página que
abre por padrão para quem chega no site sem um link específico. Textos em
`docs/js/guia.js`.

Seletor no topo: **Nominal**, **Real** (R$ de dez/2025, IPCA) ou **% do PIB**.
Tabelas com detalhes por linha (fonte, observações) e download em CSV. Tema claro/escuro.

Site responsivo. Em telas de celular (até 760px), o menu horizontal vira um botão
"hamburguer" que abre um menu em lista vertical (estilo app), com a área atual em
destaque; fecha ao escolher um item, ao tocar fora ou com Esc.

Cada área traz uma **avaliação** com cards de impactos positivos, negativos e pontos de
atenção, classificados por cinco critérios — sustentabilidade fiscal, autonomia externa,
justiça social, bem-estar social e atratividade ao investimento — e uma lista de boas
práticas. Os textos ficam em `docs/js/avaliacoes.js` e podem ser editados livremente.

Cada área também traz **"Duas leituras dos mesmos dados"**: como a visão liberal
(pró-mercado, chamada de neoliberal por seus críticos) e a visão desenvolvimentista
(ênfase em justiça social) interpretam os números, que dados enfatizam, o que propõem,
onde concordam e onde divergem. Textos em `docs/js/leituras.js`.

E há **"Narrativas × dados"**: frases frequentes de bolsonaristas e petistas checadas
contra os números (procede / procede em parte / não procede), com o mesmo número de itens
para cada lado, mais um espelho nos países de referência (Noruega, Suécia, Dinamarca,
Finlândia, Coreia do Sul e Alemanha) e uma lição para o Brasil. Textos em `docs/js/checagem.js`.

Toda área também traz **"A quem interessa o que está ocorrendo"**: quem ganha e quem
perde com os números daquela página (análise de grupos afetados, não de mérito).
Textos em `docs/js/beneficiarios.js`.

A área **Corrupção** é mais esparsa que as demais: não existe uma única fonte oficial
com série anual comparável para os quatro anos, então boa parte das células fica como
"não localizado após busca" — ver a ressalva na própria planilha `Corrupcao_...xlsx`.

A área **Fato ou Fake** é diferente das outras: não vem de uma planilha nem tem
avaliação/leituras/checagem próprias. É uma curadoria do que agências de checagem já
estabelecidas (Aos Fatos, Agência Lupa, Comprova) publicaram sobre política, economia,
o que os candidatos declaram e boatos nas redes, incluindo urnas eletrônicas — cada
item cita o verificador e linka a checagem original; o site nunca dá veredito próprio
sobre uma alegação de campanha ainda não checada por ninguém. Como a eleição de 2026
está em curso, o conteúdo reflete o que existia até a data de atualização informada na
página, não uma cobertura ao vivo. Textos em `docs/js/fatooufake.js`.

## Estrutura

```
docs/                   ← o site (publicar esta pasta)
  index.html
  css/style.css
  js/paginas.js         ← configuração das páginas (indicadores, gráficos, níveis)
  js/avaliacoes.js      ← cards de avaliação e boas práticas por página
  js/beneficiarios.js   ← quem ganha / quem perde por página
  js/leituras.js        ← leituras liberal × desenvolvimentista por página
  js/checagem.js        ← narrativas × dados e espelho internacional por página
  js/fatooufake.js      ← checagens de terceiros curadas (página "Fato ou Fake")
  js/app.js             ← renderização (KPIs, gráficos Chart.js, tabelas)
  data/dados.js         ← gerado a partir das planilhas
scripts/gerar_dados.py
build_corrupcao.py      ← gera Corrupcao_2016_2019_2022_2025.xlsx (pesquisa própria)
```

## Atualizar os dados

```bash
pip install openpyxl
python scripts/gerar_dados.py
```

As três planilhas (`XLSX`, `XLSX_QUANT` e `XLSX_CORRUP` no topo de `gerar_dados.py`)
precisam estar na raiz do projeto, com os valores das fórmulas salvos (abra e salve no
Excel se tiverem sido geradas por script sem cálculo). Os dicionários
`ABAS`/`ABAS_QUANT`/`ABAS_CORRUP` mapeiam cada aba de cada planilha à chave usada em
`paginas.js`; `aba_tematica()` é compartilhada pelas três planilhas e não deve exigir
formato diferente entre elas — a única diferença tratada é a escala de "%": as
planilhas complementar e de corrupção guardam 0–100, a fiscal guarda 0–1 (fração), e o
script normaliza para fração (`pct_0a100=True`).

## Ver localmente

Abra `docs/index.html` no navegador, ou rode `python -m http.server -d docs 8000`
e acesse http://localhost:8000.

## Publicar

**GitHub Pages:** envie o repositório ao GitHub → *Settings → Pages* →
*Deploy from a branch* → branch `main`, pasta `/docs`.

**Render:** *New → Blueprint* apontando para o repositório (usa `render.yaml`),
ou *New → Static Site* com *Publish directory* = `docs` e build vazio.

## Correções em relação à planilha

Na aba *PIB setorial*, os valores de 2016 e 2022 de duas linhas vieram de outra
série por colisão de chaves no script gerador (`imp` e `adm`):

| Linha | Planilha (2016 / 2022) | Correto – IBGE SIDRA 1846 |
|---|---|---|
| 1.2 Impostos líquidos sobre produtos | 139,3 / 272,6 (importações, US$) | 849,5 / 1.343,2 |
| 4.6 Adm. pública, saúde e educação | 14.700.000 / 22.648.395 (admissões) | 945,1 / 1.365,8 |

O `gerar_dados.py` aplica a correção; as linhas aparecem marcadas como
**CORRIGIDO** no site.
