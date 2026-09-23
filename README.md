# Economia Brasileira em Números

Site estático que apresenta a economia e as contas públicas do Brasil em
2016, 2019, 2022 e 2025, a partir da planilha `Brasil_2016_2019_2022_2025.xlsx`.
Cada área desce do dado agregado (PIB, arrecadação, dívida) até o segmento.

**Áreas (menu):** Visão geral · PIB e produção · Receitas · Despesas · Dívida e juros ·
Orçamento · Áreas sociais · Educação · Políticas afirmativas · Fomento · Emprego · Setor externo · Investimento · Fontes.

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

## Estrutura

```
docs/                 ← o site (publicar esta pasta)
  index.html
  css/style.css
  js/paginas.js       ← configuração das páginas (indicadores, gráficos, níveis)
  js/avaliacoes.js    ← cards de avaliação e boas práticas por página
  js/leituras.js      ← leituras liberal × desenvolvimentista por página
  js/checagem.js      ← narrativas × dados e espelho internacional por página
  js/app.js           ← renderização (KPIs, gráficos Chart.js, tabelas)
  data/dados.js       ← gerado a partir da planilha
scripts/gerar_dados.py
```

## Atualizar os dados

```bash
pip install openpyxl
python scripts/gerar_dados.py
```

A planilha precisa ter os valores das fórmulas salvos (abra e salve no Excel se
tiver sido gerada por script sem cálculo).

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
