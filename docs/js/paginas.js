/* Configuração das páginas do site.
 * Cada página desce do agregado para o detalhe em "níveis".
 * Referência a um indicador: [aba, código, estágio opcional (prefixo)].
 */
(function () {
  const EST = [
    ["Dotação inicial", "Dotação inicial (LOA)"],
    ["Dotação atualizada", "Dotação atualizada"],
    ["Empenhado", "Empenhado"],
    ["Liquidado", "Liquidado"],
    ["Pago", "Pago"],
  ];
  // série por estágio de execução orçamentária (ignora estágios inexistentes)
  const estagios = (aba, cod) => EST.map(([e, nome]) => ({ r: [aba, cod, e], nome, opcional: true }));
  // estágios da aba de políticas afirmativas (dados do Portal da Transparência)
  const EST_PA = [
    ["Orçamento atualizado", "Orçamento atualizado"],
    ["Empenhado", "Empenhado"],
    ["Liquidado", "Liquidado"],
    ["Pago", "Pago no exercício"],
    ["Restos a pagar", "Restos a pagar pagos"],
  ];
  const estagiosPA = (aba, cod) => EST_PA.map(([e, nome]) => ({ r: [aba, cod, e], nome, opcional: true }));

  window.PAGINAS = [
    {
      id: "guia",
      menu: "Como usar",
      titulo: "Como usar este site",
      desc: "Um guia rápido antes de mergulhar nos números: o que este site mostra, como ler os valores e para onde ir primeiro.",
      niveis: [
        { titulo: "O que é este site", html: "guia_sobre" },
        { titulo: "Como ler os números", html: "guia_leitura" },
        { titulo: "O que tem em cada página", html: "guia_estrutura" },
        { titulo: "Para onde ir", desc: "Uma pergunta por página — clique para ir direto", html: "guia_dicas" },
      ],
    },

    {
      id: "visao",
      menu: "Visão geral",
      titulo: "A economia brasileira em quatro momentos",
      desc: "2016 (fundo da recessão), 2019 (ajuste sob o teto de gastos), 2022 (boom de commodities) e 2025 (expansão do gasto e juros altos). Comece pelo tamanho da economia e das contas públicas e desça, pelo menu, até cada segmento.",
      trilha: ["PIB", "Arrecadação", "Despesa", "Dívida", "Segmentos"],
      niveis: [
        {
          titulo: "Os grandes números",
          desc: "Valor de 2025 e variação frente a 2016 e 2022",
          kpis: [
            { r: ["pib", "1"], nome: "PIB", link: "economia" },
            { r: ["receitas", "8"], nome: "Arrecadação federal", link: "receitas" },
            { r: ["despesas", "11"], nome: "Despesa primária do Governo Central", link: "despesas" },
            { r: ["despesas", "11.8"], nome: "Resultado primário do Governo Central", link: "despesas" },
            { r: ["divida", "14.1"], nome: "Dívida bruta (DBGG)", link: "divida" },
            { r: ["divida", "19"], nome: "Juros nominais do setor público", link: "divida" },
            { r: ["emprego", "44"], nome: "Taxa de desemprego", link: "emprego" },
            { r: ["externo", "47"], nome: "Exportações", link: "externo" },
          ],
        },
        {
          titulo: "Economia × Estado",
          desc: "Do tamanho do PIB ao peso das contas públicas",
          graficos: [
            {
              titulo: "PIB, arrecadação, despesa e dívida",
              sub: "Mude para \"% do PIB\" no topo para ver o peso de cada agregado",
              tipo: "barras",
              series: [
                { r: ["pib", "1"], nome: "PIB" },
                { r: ["divida", "14"], nome: "Dívida bruta (estoque)" },
                { r: ["receitas", "8"], nome: "Arrecadação federal" },
                { r: ["despesas", "11"], nome: "Despesa primária GC" },
              ],
            },
            {
              titulo: "Dívida pública em % do PIB",
              sub: "Estoques em dezembro (BCB)",
              tipo: "linhas",
              series: [
                { r: ["divida", "14.1"], nome: "Dívida bruta (DBGG)" },
                { r: ["divida", "15.1"], nome: "Dívida líquida (DLSP)" },
              ],
            },
          ],
        },
        { titulo: "Síntese", desc: "Leitura das principais diferenças entre os quatro anos", html: "sintese" },
        { titulo: "Parâmetros de cálculo", desc: "Base para correção monetária, câmbio e % do PIB", html: "parametros" },
      ],
    },

    {
      id: "economia",
      menu: "PIB e produção",
      titulo: "PIB e estrutura produtiva",
      desc: "Do PIB total ao valor adicionado de cada atividade econômica (IBGE, Contas Nacionais).",
      trilha: ["PIB", "VAB + impostos", "Agro · Indústria · Comércio · Serviços", "Atividades"],
      niveis: [
        {
          titulo: "PIB total",
          kpis: [
            { r: ["pib", "1"], nome: "PIB a preços de mercado" },
            { r: ["pib", "1.1"], nome: "Valor adicionado bruto (VAB)" },
            { r: ["pib", "1.2"], nome: "Impostos líquidos sobre produtos" },
            { r: ["privado", "45"], nome: "Investimento (FBCF)" },
          ],
        },
        {
          titulo: "Grandes setores",
          desc: "Agropecuária + indústria + comércio + demais serviços + impostos = PIB",
          graficos: [
            {
              titulo: "Composição do PIB",
              sub: "Em \"% do PIB\" as barras somam 100%",
              tipo: "empilhado",
              series: [
                { r: ["pib", "2"], nome: "Agropecuária" },
                { r: ["pib", "3"], nome: "Indústria" },
                { r: ["pib", "4.1"], nome: "Comércio" },
                { calc: "resto", base: ["pib", "4"], menos: [["pib", "4.1"]], nome: "Demais serviços" },
                { r: ["pib", "1.2"], nome: "Impostos líquidos" },
              ],
              nota: "Comércio faz parte do setor de serviços do IBGE; aqui aparece separado dos demais serviços. Impostos líquidos = impostos sobre produtos (ICMS, IPI, ISS, PIS/Cofins, imposto de importação) − subsídios. As atividades são medidas pelo que o produtor recebe (VAB); o PIB, pelo preço pago pelo comprador — a diferença é essa camada de impostos (~14% do PIB). Não é a carga tributária total: IR e contribuições sobre a folha já estão dentro do VAB.",
            },
            {
              titulo: "Participação no PIB",
              sub: "VAB da atividade ÷ PIB",
              tipo: "linhas",
              series: [
                { r: ["pib", "7c'"], nome: "Serviços (total, inclui comércio)" },
                { r: ["pib", "7b"], nome: "Indústria" },
                { calc: "razao", num: ["pib", "4.1"], den: ["pib", "1"], nome: "Comércio" },
                { r: ["pib", "7c"], nome: "Financeiro" },
                { r: ["pib", "7a"], nome: "Agropecuária" },
              ],
            },
          ],
        },
        {
          titulo: "Segmentos",
          desc: "Atividades dentro da indústria e dos serviços",
          graficos: [
            {
              titulo: "Indústria por segmento",
              tipo: "empilhado",
              series: [
                { r: ["pib", "3.2"], nome: "Transformação" },
                { r: ["pib", "3.1"], nome: "Extrativa" },
                { r: ["pib", "3.4"], nome: "Construção" },
                { r: ["pib", "3.3"], nome: "Energia, água e saneamento" },
              ],
            },
            {
              titulo: "Serviços por segmento",
              sub: "2016 → 2025, lado a lado",
              tipo: "categorias",
              series: [
                { r: ["pib", "4.5"], nome: "Outros serviços" },
                { r: ["pib", "4.6"], nome: "Adm. pública, saúde e educ." },
                { r: ["pib", "4.1"], nome: "Comércio" },
                { r: ["pib", "4.4"], nome: "Imobiliárias" },
                { r: ["pib", "5"], nome: "Financeiro" },
                { r: ["pib", "4.2"], nome: "Transporte" },
                { r: ["pib", "4.3"], nome: "Informação e comunic." },
              ],
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["pib"] },
      ],
    },

    {
      id: "receitas",
      menu: "Receitas",
      titulo: "Arrecadação e receitas públicas",
      desc: "Da arrecadação federal à receita líquida do Governo Central, tributo a tributo, e o que o Estado deixa de arrecadar (subsídios).",
      trilha: ["Arrecadação", "Receita primária", "Receita líquida", "Tributos", "Subsídios"],
      niveis: [
        {
          titulo: "Arrecadação total",
          kpis: [
            { r: ["receitas", "8"], nome: "Arrecadação federal (RFB + outros)" },
            { r: ["receitas", "10"], nome: "Receita primária do Governo Central" },
            { r: ["receitas", "10.2"], nome: "Receita líquida do Governo Central" },
            { r: ["receitas", "16.1"], nome: "Subsídios da União (total)" },
          ],
          graficos: [
            {
              titulo: "Da receita total à receita líquida",
              sub: "Receita primária − transferências a estados e municípios = receita líquida",
              tipo: "barras",
              larga: true,
              series: [
                { r: ["receitas", "8"], nome: "Arrecadação federal" },
                { r: ["receitas", "10"], nome: "Receita primária GC" },
                { r: ["receitas", "10.1"], nome: "Transferências por repartição" },
                { r: ["receitas", "10.2"], nome: "Receita líquida GC" },
              ],
              nota: "Arrecadação (RFB) e receita do RTN são conceitos distintos — não somar.",
            },
          ],
        },
        {
          titulo: "Principais tributos",
          graficos: [
            {
              titulo: "Receitas por tributo",
              tipo: "categorias",
              series: [
                { r: ["receitas", "8.2"], nome: "Imposto de Renda" },
                { r: ["receitas", "8.6"], nome: "Contrib. previdenciária (RGPS)" },
                { r: ["receitas", "8.3"], nome: "Cofins" },
                { r: ["receitas", "8.4"], nome: "CSLL" },
                { r: ["receitas", "8.5"], nome: "IOF" },
              ],
            },
            {
              titulo: "Receitas não tributárias",
              sub: "Petróleo, estatais e concessões",
              tipo: "barras",
              series: [
                { r: ["receitas", "8.9"], nome: "Royalties / recursos naturais" },
                { r: ["receitas", "8.8"], nome: "Dividendos" },
                { r: ["receitas", "8.7"], nome: "Concessões" },
              ],
            },
          ],
        },
        {
          titulo: "Renúncias e subsídios",
          graficos: [
            {
              titulo: "Subsídios da União",
              sub: "Gastos tributários + benefícios financeiros e creditícios",
              tipo: "empilhado",
              series: [
                { r: ["receitas", "16"], nome: "Gastos tributários" },
                { r: ["receitas", "17"], nome: "Benefícios financeiros e creditícios" },
              ],
              nota: "2025: gastos tributários são projeção oficial (estimativa).",
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["receitas"] },
      ],
    },

    {
      id: "despesas",
      menu: "Despesas",
      titulo: "Despesas públicas e resultado fiscal",
      desc: "Do gasto total da União à composição da despesa primária, e o resultado que sobra (ou falta).",
      trilha: ["Gasto total", "Primária + juros", "Resultado", "Componentes"],
      niveis: [
        {
          titulo: "Gasto total",
          kpis: [
            { r: ["despesas", "9"], nome: "Gastos da União pagos (sem refinanciamento)" },
            { r: ["despesas", "12"], nome: "Despesa total do Governo Central" },
            { r: ["despesas", "11"], nome: "Despesa primária do Governo Central" },
            { r: ["despesas", "12.1"], nome: "Juros nominais do Governo Central" },
          ],
          graficos: [
            {
              titulo: "Despesa total = primária + juros",
              tipo: "empilhado",
              series: [
                { r: ["despesas", "11"], nome: "Despesa primária" },
                { r: ["despesas", "12.1"], nome: "Juros nominais" },
              ],
              nota: "Soma de critérios distintos (caixa STN + competência BCB): aproximação.",
            },
            {
              titulo: "Resultado primário do Governo Central",
              sub: "Receita líquida − despesa primária",
              tipo: "barras",
              sinal: true,
              series: [{ r: ["despesas", "11.8"], nome: "Resultado primário" }],
              nota: "2022: divulgação original R$ 54,1 bi; série atual R$ 46,4 bi.",
            },
          ],
        },
        {
          titulo: "Para onde vai a despesa primária",
          graficos: [
            {
              titulo: "Composição da despesa primária",
              tipo: "empilhado",
              larga: true,
              series: [
                { r: ["despesas", "11.1"], nome: "Previdência (RGPS)" },
                { r: ["despesas", "11.2"], nome: "Pessoal" },
                { r: ["despesas", "11.7"], nome: "Discricionárias" },
                { r: ["despesas", "11.3"], nome: "BPC/LOAS" },
                { r: ["despesas", "11.4"], nome: "Abono e seguro-desemprego" },
                { r: ["despesas", "11.5"], nome: "Fundeb" },
                { r: ["despesas", "11.6"], nome: "Precatórios" },
                { calc: "resto", base: ["despesas", "11"], menos: [["despesas", "11.1"], ["despesas", "11.2"], ["despesas", "11.3"], ["despesas", "11.4"], ["despesas", "11.5"], ["despesas", "11.6"], ["despesas", "11.7"]], nome: "Demais despesas" },
              ],
              nota: "\"Demais despesas\" = despesa primária total − itens listados (cálculo).",
            },
          ],
        },
        {
          titulo: "Resultado nominal",
          graficos: [
            {
              titulo: "Resultado nominal do Governo Central",
              sub: "Primário − juros (BCB, abaixo da linha)",
              tipo: "barras",
              sinal: true,
              series: [{ r: ["despesas", "12.2"], nome: "Resultado nominal" }],
            },
            {
              titulo: "Orçamento da União: previsto × pago",
              sub: "Inclui refinanciamento da dívida",
              tipo: "barras",
              series: [
                { r: ["despesas", "9.2"], nome: "LOA – dotação inicial" },
                { r: ["despesas", "9.1"], nome: "Pago com refinanciamento" },
                { r: ["despesas", "9"], nome: "Pago sem refinanciamento" },
              ],
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["despesas"] },
      ],
    },

    {
      id: "divida",
      menu: "Dívida e juros",
      titulo: "Dívida pública e juros",
      desc: "Do estoque da dívida ao custo dos juros, amortizações e rolagem.",
      trilha: ["Dívida bruta", "Dívida líquida", "DPF", "Juros", "Amortização e rolagem"],
      niveis: [
        {
          titulo: "Estoque da dívida",
          kpis: [
            { r: ["divida", "14.1"], nome: "Dívida bruta do Governo Geral" },
            { r: ["divida", "15.1"], nome: "Dívida líquida do setor público" },
            { r: ["divida", "13"], nome: "Dívida Pública Federal (DPF)" },
            { r: ["divida", "19.1"], nome: "Juros do setor público (% PIB)" },
          ],
          graficos: [
            {
              titulo: "Estoques de dívida",
              sub: "DBGG, DLSP e DPF são conceitos distintos",
              tipo: "barras",
              series: [
                { r: ["divida", "14"], nome: "Dívida bruta (DBGG)" },
                { r: ["divida", "13"], nome: "Dívida Pública Federal" },
                { r: ["divida", "15"], nome: "Dívida líquida (DLSP)" },
              ],
            },
            {
              titulo: "Dívida em % do PIB",
              tipo: "linhas",
              series: [
                { r: ["divida", "14.1"], nome: "Dívida bruta" },
                { r: ["divida", "15.1"], nome: "Dívida líquida" },
              ],
            },
          ],
        },
        {
          titulo: "Custo da dívida",
          graficos: [
            {
              titulo: "Juros, déficit nominal e primário (% PIB)",
              sub: "Setor público consolidado (BCB)",
              tipo: "linhas",
              series: [
                { r: ["divida", "19.4"], nome: "Déficit nominal (NFSP)" },
                { r: ["divida", "19.1"], nome: "Juros nominais" },
              ],
            },
            {
              titulo: "Resultado do setor público consolidado",
              tipo: "barras",
              series: [
                { r: ["divida", "19.2"], nome: "Resultado primário" },
                { r: ["divida", "19.3"], nome: "Resultado nominal" },
              ],
            },
          ],
        },
        {
          titulo: "Pagamentos da União",
          graficos: [
            {
              titulo: "Juros, amortização e refinanciamento pagos",
              sub: "Orçamento da União (caixa)",
              tipo: "barras",
              larga: true,
              series: [
                { r: ["divida", "21"], nome: "Refinanciamento (rolagem)" },
                { r: ["divida", "18"], nome: "Juros e encargos pagos" },
                { r: ["divida", "20"], nome: "Amortizações" },
              ],
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["divida"] },
      ],
    },

    {
      id: "orcamento",
      menu: "Orçamento",
      titulo: "LOA e execução orçamentária",
      desc: "Do que a lei orçamentária prevê ao que é efetivamente pago: dotação → empenho → liquidação → pagamento.",
      trilha: ["Despesa total", "Estágios", "Investimentos", "Por órgão"],
      niveis: [
        {
          titulo: "Orçamento total da União",
          kpis: [
            { r: ["loa", "9.3", "Dotação inicial"], nome: "Despesa prevista na LOA (sem intra)" },
            { r: ["loa", "9.3", "Pago"], nome: "Despesa paga" },
            { calc: "razao", num: ["loa", "9.3", "Pago"], den: ["loa", "9.3", "Dotação inicial"], nome: "Execução: pago ÷ dotação inicial" },
            { r: ["loa", "22–24", "Pago"], nome: "Investimentos pagos (GND 4)" },
          ],
          graficos: [
            {
              titulo: "Despesa total por estágio",
              sub: "Estágios não se somam",
              tipo: "barras",
              rampa: true,
              larga: true,
              series: estagios("loa", "9.3"),
            },
          ],
        },
        {
          titulo: "Investimentos",
          graficos: [
            {
              titulo: "Investimentos (GND 4) por estágio",
              tipo: "barras",
              rampa: true,
              series: estagios("loa", "22–24"),
            },
            {
              titulo: "Investimento pago no ano (RTN)",
              sub: "Inclui restos a pagar",
              tipo: "barras",
              series: [
                { r: ["loa", "24.2"], nome: "GND 4 + inversões financeiras" },
                { r: ["loa", "24.1"], nome: "Investimentos (GND 4)" },
              ],
            },
            {
              titulo: "Taxa de execução (pago ÷ dotação inicial)",
              tipo: "linhas",
              series: [
                { calc: "razao", num: ["loa", "9.3", "Pago"], den: ["loa", "9.3", "Dotação inicial"], nome: "Despesa total" },
                { calc: "razao", num: ["loa", "22–24", "Pago"], den: ["loa", "22–24", "Dotação inicial"], nome: "Investimentos" },
              ],
            },
          ],
        },
        {
          titulo: "Por órgão e tipo de despesa",
          desc: "Complementa a visão por função com o recorte por órgão/Poder e por item da despesa. Atenção: a base muda por ano (2016 = pago; 2019 = LOA aprovada/autógrafo; 2022/2025 = despesas primárias do Raio X do Orçamento) — ver \"Conceito\" em cada linha da tabela.",
          kpis: [
            { r: ["loa_org", "0"], nome: "LOA aprovada (Orç. Fiscal+Seguridade, com refinanciamento)" },
            { r: ["loa_org", "1"], nome: "Ministério da Saúde" },
            { r: ["loa_org", "2"], nome: "Ministério da Educação" },
            { r: ["loa_org", "14"], nome: "Transferências a estados e municípios (via LOA)", link: "federativo" },
          ],
          graficos: [
            {
              titulo: "Despesa por órgão",
              sub: "LOA aprovada/despesas primárias, conforme o ano",
              tipo: "categorias",
              larga: true,
              series: [
                { r: ["loa_org", "1"], nome: "Saúde" },
                { r: ["loa_org", "2"], nome: "Educação" },
                { r: ["loa_org", "4"], nome: "Previdência/Assistência Social" },
                { r: ["loa_org", "3"], nome: "Defesa" },
                { r: ["loa_org", "5"], nome: "Justiça e Segurança Pública (órgão)" },
              ],
              nota: "Órgão responsável por previdência/assistência mudou de nome entre governos (ver observações na tabela).",
            },
            {
              titulo: "Pessoal, juros e investimentos",
              tipo: "barras",
              series: [
                { r: ["loa_org", "9"], nome: "Pessoal" },
                { r: ["loa_org", "10"], nome: "Juros" },
                { r: ["loa_org", "13"], nome: "Investimentos (GND4)" },
              ],
              nota: "Itens não somam o total da despesa (critérios e coberturas distintos entre si).",
            },
            {
              titulo: "Amortização, rolagem e transferências",
              sub: "Serviço da dívida e transferências a estados/municípios via LOA",
              tipo: "barras",
              series: [
                { r: ["loa_org", "11"], nome: "Amortização" },
                { r: ["loa_org", "12"], nome: "Rolagem/refinanciamento" },
                { r: ["loa_org", "14"], nome: "Transferências a estados/municípios" },
              ],
              nota: "Rolagem/refinanciamento é rolagem de dívida (não é despesa primária) — por isso em gráfico à parte.",
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["loa", "loa_org"] },
      ],
    },

    {
      id: "federativo",
      menu: "Federativo",
      titulo: "Pacto federativo: repasses da União a estados e municípios",
      desc: "Quanto a União transfere a estados e municípios: partilha de receita (FPE/FPM) à parte das transferências específicas por área (saúde, educação).",
      trilha: ["FPE + FPM", "Transferências por área", "Saúde (SUS)", "Educação"],
      niveis: [
        {
          titulo: "Transferências constitucionais",
          desc: "Partilha de receita — sem classificação por área, não somar às transferências por área abaixo",
          kpis: [
            { r: ["federativo", "2.1"], nome: "FPE + FPM (total)" },
            { r: ["federativo", "1"], nome: "FPE – Fundo de Participação dos Estados" },
            { r: ["federativo", "2"], nome: "FPM – Fundo de Participação dos Municípios" },
            { r: ["despesas", "11.5"], nome: "Complementação da União ao Fundeb" },
          ],
          graficos: [
            {
              titulo: "FPE e FPM",
              sub: "Valor pago no ano, líquido da retenção de 20% ao Fundeb",
              tipo: "empilhado",
              series: [
                { r: ["federativo", "1"], nome: "FPE (estados/DF)" },
                { r: ["federativo", "2"], nome: "FPM (municípios)" },
              ],
            },
          ],
        },
        {
          titulo: "Transferências por grande área",
          desc: "Saúde (SUS fundo a fundo), educação (Fundeb, PNAE) e assistência social (FNAS/SUAS, não localizado)",
          graficos: [
            {
              titulo: "Repasses por área",
              tipo: "barras",
              larga: true,
              series: [
                { r: ["federativo", "3.1"], nome: "Saúde (SUS, líquido de glosas)" },
                { r: ["despesas", "11.5"], nome: "Educação (complementação ao Fundeb)" },
                { r: ["federativo", "5"], nome: "Educação (PNAE)" },
              ],
              nota: "Escalas muito diferentes entre áreas. Assistência social (FNAS/SUAS) não localizada para os 4 anos.",
            },
            {
              titulo: "SUS: repasse bruto × líquido",
              sub: "Líquido = bruto − descontos/glosas",
              tipo: "linhas",
              series: [
                { r: ["federativo", "3"], nome: "Bruto" },
                { r: ["federativo", "3.1"], nome: "Líquido" },
              ],
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["federativo"] },
      ],
    },

    {
      id: "social",
      menu: "Áreas sociais",
      titulo: "Previdência, saúde, educação e segurança",
      desc: "Gastos da União por função orçamentária, do maior (previdência) aos programas específicos (igualdade racial).",
      trilha: ["Previdência", "Saúde", "Educação", "Segurança", "Políticas afirmativas"],
      niveis: [
        {
          titulo: "Visão por função",
          kpis: [
            { r: ["social", "31–32", "Pago"], nome: "Previdência social – pago" },
            { r: ["social", "25–26", "Pago"], nome: "Saúde – pago" },
            { r: ["social", "27–28", "Pago"], nome: "Educação – pago" },
            { r: ["seguranca", "29–30", "Pago"], nome: "Segurança pública – pago" },
          ],
          graficos: [
            {
              titulo: "Despesa empenhada por função",
              tipo: "categorias",
              larga: true,
              series: [
                { r: ["social", "31–32", "Empenhado"], nome: "Previdência" },
                { r: ["social", "25–26", "Empenhado"], nome: "Saúde" },
                { r: ["social", "27–28", "Empenhado"], nome: "Educação" },
                { r: ["seguranca", "29–30", "Empenhado"], nome: "Segurança pública" },
              ],
            },
          ],
        },
        {
          titulo: "Previdência",
          graficos: [
            {
              titulo: "Regime geral × regime dos servidores",
              sub: "Empenhado",
              tipo: "empilhado",
              series: [
                { r: ["social", "31.1", "Empenhado"], nome: "RGPS (INSS)" },
                { r: ["social", "31.2", "Empenhado"], nome: "RPPS (servidores)" },
              ],
            },
            { titulo: "Previdência social por estágio", tipo: "barras", rampa: true, series: estagios("social", "31–32") },
          ],
        },
        {
          titulo: "Saúde e educação",
          graficos: [
            { titulo: "Saúde (função 10) por estágio", tipo: "barras", rampa: true, series: estagios("social", "25–26") },
            { titulo: "Educação (função 12) por estágio", tipo: "barras", rampa: true, series: estagios("social", "27–28") },
          ],
        },
        {
          titulo: "Segurança e políticas afirmativas",
          graficos: [
            { titulo: "Segurança pública (função 06) por estágio", tipo: "barras", rampa: true, series: estagios("seguranca", "29–30") },
            {
              titulo: "Programa de igualdade racial",
              sub: "R$ milhões · sem programa específico em 2022",
              tipo: "barras",
              series: [
                { r: ["seguranca", "33"], nome: "Orçamento atualizado" },
                { r: ["seguranca", "34a"], nome: "Empenhado" },
                { r: ["seguranca", "34c"], nome: "Pago" },
              ],
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["social", "seguranca"] },
      ],
    },

    {
      id: "seguranca_pub",
      menu: "Segurança",
      titulo: "Segurança pública: orçamento e resultados",
      desc: "Do orçamento da função Segurança Pública às estatísticas de violência: mortes violentas, letalidade policial e outros crimes, com base no Anuário Brasileiro de Segurança Pública (FBSP).",
      trilha: ["Orçamento", "Taxas (por 100 mil hab.)", "Números absolutos", "Letalidade policial"],
      niveis: [
        {
          titulo: "Panorama (taxas por 100 mil habitantes)",
          kpis: [
            { r: ["seguranca", "29–30", "Pago"], nome: "Segurança pública (função 06) – pago", link: "social" },
            { r: ["seg_dados", "1.1"], nome: "Mortes Violentas Intencionais (MVI) – taxa" },
            { r: ["seg_dados", "2.1"], nome: "Homicídio doloso – taxa" },
            { r: ["seg_dados", "8.1"], nome: "Roubos – taxa" },
          ],
          graficos: [
            {
              titulo: "Violência letal e sexual (taxa por 100 mil hab.)",
              tipo: "linhas",
              series: [
                { r: ["seg_dados", "1.1"], nome: "MVI" },
                { r: ["seg_dados", "2.1"], nome: "Homicídio doloso" },
                { r: ["seg_dados", "9.1"], nome: "Estupro" },
              ],
              nota: "MVI = homicídio doloso + feminicídio + latrocínio + lesão corporal seguida de morte + mortes por intervenção policial (série revisada pelo FBSP).",
            },
            {
              titulo: "Roubos",
              sub: "Taxa por 100 mil hab.",
              tipo: "barras",
              series: [{ r: ["seg_dados", "8.1"], nome: "Roubos" }],
              nota: "Escala bem maior que os crimes letais — por isso em gráfico à parte.",
            },
          ],
        },
        {
          titulo: "Números absolutos e letalidade policial",
          kpis: [
            { r: ["seg_dados", "1"], nome: "MVI – nº absoluto" },
            { r: ["seg_dados", "4"], nome: "Latrocínio – nº absoluto" },
            { r: ["seg_dados", "5"], nome: "Mortes por intervenção policial (MDIP)" },
            { r: ["seg_dados", "6"], nome: "Policiais civis e militares mortos" },
          ],
          graficos: [
            {
              titulo: "Homicídio doloso e estupro",
              sub: "Registros, número absoluto",
              tipo: "linhas",
              series: [
                { r: ["seg_dados", "2"], nome: "Homicídio doloso" },
                { r: ["seg_dados", "9"], nome: "Estupro" },
              ],
              nota: "Estupro: a partir de 2019 a categoria combina \"estupro\" e \"estupro de vulnerável\".",
            },
            {
              titulo: "Feminicídio, latrocínio e letalidade policial",
              sub: "Número absoluto",
              tipo: "barras",
              series: [
                { r: ["seg_dados", "3"], nome: "Feminicídio" },
                { r: ["seg_dados", "4"], nome: "Latrocínio" },
                { r: ["seg_dados", "5"], nome: "MDIP (letalidade policial)" },
              ],
              nota: "Feminicídio subiu mesmo com a MVI total em queda — não são a mesma coisa: um é um dos componentes do total.",
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["seg_dados"] },
      ],
    },

    {
      id: "educacao",
      menu: "Educação",
      titulo: "Educação: todos os gastos federais em um só lugar",
      desc: "Consolida os dados de educação espalhados pelas demais áreas: função Educação do orçamento, Fundeb, alimentação escolar, Pé-de-Meia, assistência estudantil, Fies e ProUni — e, além do dinheiro, matrículas, rendimento escolar, Enem e Sisu.",
      trilha: ["Função Educação", "Educação básica", "Ensino superior e técnico", "Crédito e renúncias", "Matrículas", "Enem e Sisu"],
      niveis: [
        {
          titulo: "Gasto federal em educação",
          kpis: [
            { r: ["social", "27–28", "Pago"], nome: "Educação (função 12) – pago" },
            { r: ["despesas", "11.5"], nome: "Complementação da União ao Fundeb" },
            { r: ["afirmativas", "PA.10"], nome: "Alimentação escolar (PNAE) – repasse" },
            { r: ["afirmativas", "PA.8"], nome: "Pé-de-Meia (previsto, fora da LOA)" },
          ],
          graficos: [
            {
              titulo: "Função Educação por estágio",
              sub: "Da dotação ao pagamento",
              tipo: "barras",
              rampa: true,
              series: estagios("social", "27–28"),
              nota: "\"Pago\" vem do Portal da Transparência e inclui restos a pagar; por isso pode superar a dotação.",
            },
            {
              titulo: "Esforço federal em educação (% do PIB)",
              sub: "Valores pagos",
              tipo: "linhas",
              series: [
                { calc: "razao", num: ["social", "27–28", "Pago"], den: ["pib", "1"], nome: "Função Educação" },
                { calc: "razao", num: ["despesas", "11.5"], den: ["pib", "1"], nome: "Complementação ao Fundeb" },
              ],
              nota: "A complementação ao Fundeb faz parte da função Educação: as linhas não se somam.",
            },
          ],
        },
        {
          titulo: "Educação básica",
          desc: "Transferências da União a estados e municípios e apoio ao aluno",
          graficos: [
            {
              titulo: "Fundeb, alimentação escolar e Pé-de-Meia",
              tipo: "barras",
              larga: true,
              series: [
                { r: ["despesas", "11.5"], nome: "Complementação ao Fundeb" },
                { r: ["afirmativas", "PA.8"], nome: "Pé-de-Meia (previsto)" },
                { r: ["afirmativas", "PA.10"], nome: "PNAE – repasse federal" },
              ],
              nota: "Pé-de-Meia criado em 2024 e pago por fundo fora do orçamento. PNAE 2025 = orçamento estimado.",
            },
          ],
        },
        {
          titulo: "Ensino superior e técnico",
          desc: "Permanência de estudantes vulneráveis",
          graficos: [
            {
              titulo: "Assistência estudantil – valor pago",
              sub: "R$ milhões · pago no exercício",
              tipo: "categorias",
              series: [
                { r: ["afirmativas", "PA.3", "Pago"], nome: "PNAES (universidades)" },
                { r: ["afirmativas", "PA.4", "Pago"], nome: "Institutos federais (EPT)" },
                { r: ["afirmativas", "PA.5", "Pago"], nome: "Bolsa Permanência" },
              ],
            },
            {
              titulo: "Bolsa Permanência por estágio",
              sub: "R$ milhões · indígenas, quilombolas e baixa renda",
              tipo: "barras",
              rampa: true,
              series: estagiosPA("afirmativas", "PA.5"),
            },
          ],
        },
        {
          titulo: "Crédito educativo e renúncias",
          desc: "Fies e ProUni: custo fiscal, não gasto direto",
          graficos: [
            {
              titulo: "Fies e ProUni",
              tipo: "barras",
              larga: true,
              series: [
                { r: ["afirmativas", "PA.11"], nome: "Fies – impacto primário" },
                { r: ["afirmativas", "PA.11.1"], nome: "Fies – subsídio implícito" },
                { r: ["afirmativas", "PA.12"], nome: "ProUni – renúncia tributária" },
              ],
              nota: "Conceitos distintos, não somar. Subsídio do Fies só localizado para 2022. ProUni 2025 é projeção.",
            },
          ],
        },
        {
          titulo: "Matrículas e rede escolar",
          desc: "Números, não valores: Censo Escolar e Censo da Educação Superior (Inep)",
          kpis: [
            { r: ["edu_matriculas", "1"], nome: "Matrículas – educação básica" },
            { r: ["edu_matriculas", "2"], nome: "Número de escolas – educação básica" },
            { r: ["edu_matriculas", "6"], nome: "Matrículas – graduação" },
            { r: ["edu_matriculas", "3"], nome: "Taxa de aprovação – fundamental, rede pública" },
          ],
          graficos: [
            {
              titulo: "Taxas de rendimento escolar",
              sub: "Fundamental/médio, rede pública",
              tipo: "linhas",
              series: [
                { r: ["edu_matriculas", "3"], nome: "Aprovação (fundamental)" },
                { r: ["edu_matriculas", "4"], nome: "Reprovação (fundamental)" },
                { r: ["edu_matriculas", "5"], nome: "Abandono (médio)" },
              ],
              nota: "Etapa/recorte varia por ano conforme o que foi divulgado pelo Inep — ver observações na tabela.",
            },
            {
              titulo: "Ensino superior: rede pública e EAD",
              sub: "Participação nas matrículas de graduação",
              tipo: "linhas",
              series: [
                { r: ["edu_matriculas", "6.1"], nome: "Rede pública" },
                { r: ["edu_matriculas", "6.2"], nome: "Ensino a distância (EAD)" },
              ],
            },
          ],
        },
        {
          titulo: "Enem e Sisu",
          desc: "Inscritos, participantes e vagas — números, não valores",
          kpis: [
            { r: ["enem_sisu", "1"], nome: "Enem – inscritos" },
            { r: ["enem_sisu", "3"], nome: "Enem – taxa de abstenção" },
            { r: ["enem_sisu", "4"], nome: "Sisu – inscrições" },
            { r: ["enem_sisu", "5"], nome: "Sisu – vagas ofertadas" },
          ],
          graficos: [
            {
              titulo: "Enem: inscritos e presentes",
              tipo: "barras",
              series: [
                { r: ["enem_sisu", "1"], nome: "Inscritos" },
                { r: ["enem_sisu", "2"], nome: "Presentes" },
              ],
              nota: "2016 exclui treineiros (PPL); 2022/2025: número de presentes não localizado (só % de presença).",
            },
            {
              titulo: "Sisu: vagas e convocados",
              sub: "1ª edição do ano",
              tipo: "barras",
              series: [
                { r: ["enem_sisu", "5"], nome: "Vagas ofertadas" },
                { r: ["enem_sisu", "6"], nome: "Convocados/matriculados" },
              ],
              nota: "Convocados/matriculados só localizado para 2025.",
            },
          ],
        },
        {
          titulo: "Tabela completa",
          tabela: [{
            chave: "educacao",
            titulo: "Educação – dados consolidados",
            subtitulo: "Linhas reunidas das abas Saúde, educação e previdência; Despesas públicas; e Políticas afirmativas e apoio.",
            linhas: [
              ["social", "27–28"], ["despesas", "11.5"],
              ["afirmativas", "PA.10"], ["afirmativas", "PA.10.1"], ["afirmativas", "PA.8"],
              ["afirmativas", "PA.3"], ["afirmativas", "PA.4"], ["afirmativas", "PA.5"],
              ["afirmativas", "PA.11"], ["afirmativas", "PA.11.1"], ["afirmativas", "PA.12"],
            ],
          }, "edu_matriculas", "enem_sisu"],
        },
      ],
    },

    {
      id: "afirmativas",
      menu: "Políticas afirmativas",
      titulo: "Políticas afirmativas e de apoio social",
      desc: "Da transferência de renda (Bolsa Família / Auxílio Brasil) e do BPC à assistência estudantil, alimentação escolar, crédito educativo e programas de igualdade racial.",
      trilha: ["Subtotal", "Transferência de renda", "BPC", "Assistência estudantil", "Educação", "Igualdade racial"],
      niveis: [
        {
          titulo: "Visão geral do apoio social",
          kpis: [
            { r: ["afirmativas", "PA.9"], nome: "Subtotal pago – políticas afirmativas e de apoio" },
            { r: ["afirmativas", "PA.1", "Pago"], nome: "Transferência de renda – pago" },
            { r: ["afirmativas", "PA.2"], nome: "BPC/LOAS e RMV – pago" },
            { r: ["afirmativas", "PA.1.2"], nome: "Famílias atendidas (Bolsa Família / Auxílio Brasil)" },
          ],
          graficos: [
            {
              titulo: "Transferência de renda e BPC",
              sub: "Valores pagos",
              tipo: "barras",
              series: [
                { r: ["afirmativas", "PA.2"], nome: "BPC/LOAS e RMV (RTN)" },
                { r: ["afirmativas", "PA.1", "Pago"], nome: "Bolsa Família / Auxílio Brasil (Portal)" },
                { r: ["afirmativas", "PA.1.1"], nome: "Bolsa Família / Auxílio Brasil (RTN)" },
              ],
              nota: "Portal (pago no exercício) e RTN (caixa) usam critérios distintos — não somar. 2022: o RTN não inclui o adicional pago por crédito extraordinário.",
            },
            {
              titulo: "Famílias atendidas",
              sub: "Posição mensal (set/2016, out/2019, dez/2022, dez/2025)",
              tipo: "barras",
              series: [{ r: ["afirmativas", "PA.1.2"], nome: "Famílias" }],
            },
          ],
        },
        {
          titulo: "Assistência estudantil",
          desc: "Permanência de estudantes de baixa renda, indígenas e quilombolas",
          graficos: [
            {
              titulo: "Assistência estudantil – valor pago",
              sub: "R$ milhões · pago no exercício (sem restos a pagar)",
              tipo: "categorias",
              series: [
                { r: ["afirmativas", "PA.3", "Pago"], nome: "PNAES (ensino superior)" },
                { r: ["afirmativas", "PA.4", "Pago"], nome: "Institutos federais (EPT)" },
                { r: ["afirmativas", "PA.5", "Pago"], nome: "Bolsa Permanência" },
              ],
            },
            {
              titulo: "PNAES por estágio",
              sub: "R$ milhões",
              tipo: "barras",
              rampa: true,
              series: estagiosPA("afirmativas", "PA.3"),
            },
          ],
        },
        {
          titulo: "Outros apoios à educação",
          desc: "Conceitos distintos: repasse, impacto primário e renúncia tributária",
          graficos: [
            {
              titulo: "PNAE, Fies e ProUni",
              tipo: "barras",
              larga: true,
              series: [
                { r: ["afirmativas", "PA.10"], nome: "PNAE – repasse federal" },
                { r: ["afirmativas", "PA.11"], nome: "Fies – impacto primário" },
                { r: ["afirmativas", "PA.12"], nome: "ProUni – renúncia tributária" },
              ],
              nota: "PNAE 2025 = orçamento estimado. Fies mede só o efeito primário (não o valor financiado). ProUni 2025 é projeção.",
            },
          ],
        },
        {
          titulo: "Igualdade racial e novos programas",
          kpis: [
            { r: ["afirmativas", "PA.6", "Pago"], nome: "Igualdade racial – pago" },
            { r: ["afirmativas", "PA.8"], nome: "Pé-de-Meia (previsto, fora da LOA)" },
            { r: ["afirmativas", "PA.7"], nome: "Auxílio Gás (orçamento/previsão)" },
            { r: ["afirmativas", "PA.1.3"], nome: "Benefício médio por família (mensal)" },
          ],
          graficos: [
            {
              titulo: "Programa de igualdade racial por estágio",
              sub: "R$ milhões · programas 2034 (2016, 2019) e 5804 (2025); sem programa específico em 2022",
              tipo: "barras",
              rampa: true,
              larga: true,
              series: estagiosPA("afirmativas", "PA.6"),
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["afirmativas"] },
      ],
    },

    {
      id: "corrupcao",
      menu: "Corrupção",
      titulo: "Corrupção: percepção e apuração",
      desc: "Diferente das demais áreas deste site, não existe uma única fonte oficial com série anual comparável de corrupção para os quatro anos — os indicadores abaixo vêm de fontes distintas (Transparency International, Datafolha, CGU, reportagens com dado via Lei de Acesso à Informação), e vários anos ficam sem dado apesar da busca. Ver a aba Fontes para o detalhe de cada busca.",
      trilha: ["Percepção (CPI, Datafolha)", "Apuração (operações, prisões)"],
      niveis: [
        {
          titulo: "Percepção: especialistas e população",
          kpis: [
            { r: ["corrupcao", "1"], nome: "Índice de Percepção de Corrupção (CPI)" },
            { r: ["corrupcao", "1.1"], nome: "CPI — posição no ranking mundial" },
            { r: ["corrupcao", "2"], nome: "Corrupção como principal problema do Brasil (Datafolha)" },
          ],
          graficos: [
            {
              titulo: "Índice de Percepção de Corrupção",
              sub: "Transparency International · 0 (muito corrupto) a 100 (muito íntegro)",
              tipo: "barras",
              series: [{ r: ["corrupcao", "1"], nome: "CPI" }],
              nota: "2016 e 2022 não localizados com segurança — fontes secundárias divergiram sem confirmação no relatório original.",
            },
            {
              titulo: "Corrupção como principal problema do país",
              sub: "% de entrevistados, pesquisa Datafolha",
              tipo: "barras",
              series: [{ r: ["corrupcao", "2"], nome: "Corrupção (Datafolha)" }],
              nota: "2019 não localizado com um valor único e confiável.",
            },
          ],
        },
        {
          titulo: "Apuração: operações e prisões",
          desc: "Mede esforço/resultado de investigação, não o nível real de corrupção — depende de prioridade política e de regras de prisão vigentes em cada momento",
          kpis: [
            { r: ["corrupcao", "3"], nome: "Operações de combate à corrupção (CGU)" },
            { r: ["corrupcao", "4"], nome: "Prisões em operações da PF por corrupção" },
          ],
          graficos: [
            {
              titulo: "Operações e prisões por corrupção",
              tipo: "barras",
              larga: true,
              series: [
                { r: ["corrupcao", "3"], nome: "Operações deflagradas (CGU)" },
                { r: ["corrupcao", "4"], nome: "Prisões (PF)" },
              ],
              nota: "Série muito incompleta: cada indicador só tem 2 dos 4 anos. A queda de prisões (421→42) ocorreu entre 2019 e 2022, ainda no governo Bolsonaro.",
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["corrupcao"] },
      ],
    },

    {
      id: "fato_ou_fake",
      menu: "Fato ou Fake",
      titulo: "Fato ou Fake",
      desc: "Não é uma checagem própria deste site: é uma curadoria do que agências de checagem já estabelecidas (Aos Fatos, Agência Lupa, Comprova) apuraram sobre política, economia, o que os candidatos declaram e boatos que circulam nas redes — incluindo urnas eletrônicas. Eleição em curso (1º turno em 04/10/2026): cada item tem data e link para a checagem original; não damos veredito próprio sobre alegação que ninguém checou ainda. Atualizado em 22/09/2026.",
      niveis: [
        { titulo: "Urnas eletrônicas", desc: "O tema mais recorrente de desinformação eleitoral no Brasil desde 2018", html: "fato_urnas" },
        { titulo: "O que Lula declara", desc: "Checagens de entrevistas e falas de campanha do candidato à reeleição", html: "fato_lula" },
        { titulo: "O que Flávio Bolsonaro declara", desc: "Checagens de entrevistas e falas de campanha do candidato ao Planalto", html: "fato_flavio" },
        { titulo: "Boatos e campanhas virais nas redes", desc: "Vídeos fora de contexto, teorias da conspiração e simulações apresentadas como reais", html: "fato_viral" },
      ],
    },

    {
      id: "fomento",
      menu: "Fomento",
      titulo: "BNDES, Plano Safra e P&D",
      desc: "Crédito público fora do orçamento (BNDES), crédito rural anunciado (Plano Safra) e esforço em pesquisa e desenvolvimento.",
      trilha: ["BNDES", "Plano Safra", "P&D"],
      niveis: [
        {
          titulo: "Crédito público",
          kpis: [
            { r: ["fomento", "39"], nome: "Plano Safra (ciclo)" },
            { r: ["fomento", "36"], nome: "Aprovações do BNDES" },
            { r: ["fomento", "35"], nome: "Desembolsos do BNDES" },
            { r: ["fomento", "38"], nome: "P&D nacional (% PIB)" },
          ],
          graficos: [
            {
              titulo: "BNDES: aprovações e desembolsos",
              tipo: "barras",
              series: [
                { r: ["fomento", "36"], nome: "Aprovações" },
                { r: ["fomento", "35"], nome: "Desembolsos" },
              ],
              nota: "Aprovações 2022 estimadas a partir de variações divulgadas pelo BNDES.",
            },
            {
              titulo: "Plano Safra anunciado",
              sub: "Ciclos jul–jun: 2016/17, 2019/20, 2022/23, 2025/26",
              tipo: "empilhado",
              series: [
                { r: ["fomento", "39.1"], nome: "Agricultura empresarial" },
                { r: ["fomento", "39.2"], nome: "Agricultura familiar" },
              ],
            },
          ],
        },
        {
          titulo: "Pesquisa e desenvolvimento",
          graficos: [
            { titulo: "Função Ciência e Tecnologia por estágio", tipo: "barras", rampa: true, series: estagios("fomento", "37") },
            {
              titulo: "Dispêndio nacional em P&D",
              sub: "Governo + empresas (R$, estimado a partir do % do PIB)",
              tipo: "barras",
              series: [{ r: ["fomento", "38.1"], nome: "P&D nacional" }],
              nota: "2025 usa o último dado disponível (2023): 1,19% do PIB.",
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["fomento"] },
      ],
    },

    {
      id: "emprego",
      menu: "Emprego",
      titulo: "Mercado de trabalho",
      desc: "Da taxa de desemprego ao fluxo de admissões e desligamentos com carteira assinada.",
      trilha: ["Desemprego", "Emprego formal", "Admissões e desligamentos"],
      niveis: [
        {
          titulo: "Visão geral",
          kpis: [
            { r: ["emprego", "44"], nome: "Taxa média de desemprego" },
            { r: ["emprego", "40"], nome: "Empregos formais (estoque em dez)" },
            { r: ["emprego", "43"], nome: "Saldo anual de empregos formais" },
            { r: ["emprego", "44.2"], nome: "Desocupados (média anual)" },
          ],
          graficos: [
            {
              titulo: "Taxa de desemprego",
              sub: "PNAD Contínua (IBGE)",
              tipo: "linhas",
              series: [
                { r: ["emprego", "44"], nome: "Média anual publicada" },
                { r: ["emprego", "44.1"], nome: "Média dos 4 trimestres (série atual)" },
              ],
            },
            {
              titulo: "Estoque de empregos formais",
              sub: "Vínculos celetistas em 31/dez",
              tipo: "barras",
              series: [{ r: ["emprego", "40"], nome: "Estoque" }],
              nota: "2016 estimado a partir do saldo de dezembro.",
            },
          ],
        },
        {
          titulo: "Fluxos do Caged",
          graficos: [
            {
              titulo: "Saldo anual de empregos formais",
              tipo: "barras",
              sinal: true,
              series: [{ r: ["emprego", "43"], nome: "Saldo" }],
              nota: "Quebra de série em 2020 (Caged → Novo Caged).",
            },
            {
              titulo: "Admissões e desligamentos",
              tipo: "barras",
              series: [
                { r: ["emprego", "41"], nome: "Admissões" },
                { r: ["emprego", "42"], nome: "Desligamentos" },
              ],
              nota: "2016 publicado arredondado (14,7 mi e 16,1 mi).",
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["emprego"] },
      ],
    },

    {
      id: "externo",
      menu: "Setor externo",
      titulo: "Comércio exterior e investimento estrangeiro",
      desc: "Corrente de comércio, exportações, importações, saldo e investimento direto no país (US$).",
      trilha: ["Corrente de comércio", "Exportações × importações", "Saldo", "IDP"],
      niveis: [
        {
          titulo: "Comércio total",
          kpis: [
            { r: ["externo", "49.1"], nome: "Corrente de comércio" },
            { r: ["externo", "47"], nome: "Exportações" },
            { r: ["externo", "48"], nome: "Importações" },
            { r: ["externo", "46"], nome: "Investimento direto no país" },
          ],
          graficos: [
            {
              titulo: "Exportações e importações",
              sub: "US$ FOB",
              tipo: "barras",
              series: [
                { r: ["externo", "47"], nome: "Exportações" },
                { r: ["externo", "48"], nome: "Importações" },
              ],
            },
            {
              titulo: "Saldo comercial e IDP",
              tipo: "barras",
              series: [
                { r: ["externo", "46"], nome: "Investimento direto (IDP)" },
                { r: ["externo", "49"], nome: "Saldo da balança" },
              ],
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["externo"] },
      ],
    },

    {
      id: "investimento",
      menu: "Investimento",
      titulo: "Investimento e infraestrutura",
      desc: "Do investimento total da economia (FBCF) à infraestrutura e aos modais de transporte financiados pela União.",
      trilha: ["FBCF", "Infraestrutura (todas as fontes)", "Federal", "Transporte", "Modais"],
      niveis: [
        {
          titulo: "Investimento total",
          kpis: [
            { r: ["privado", "45"], nome: "Formação bruta de capital fixo" },
            { r: ["infra", "56.1"], nome: "Infraestrutura – todas as fontes (Abdib)" },
            { r: ["infra", "50"], nome: "Infraestrutura federal paga (RTN)" },
            { r: ["infra", "51"], nome: "PAC / Novo PAC (orçamento)" },
          ],
          graficos: [
            {
              titulo: "Investimento na economia (FBCF)",
              sub: "Público + privado",
              tipo: "barras",
              series: [{ r: ["privado", "45"], nome: "FBCF" }],
            },
            {
              titulo: "Infraestrutura: total × privado × federal",
              tipo: "barras",
              series: [
                { r: ["infra", "56.1"], nome: "Total (Abdib)" },
                { r: ["privado", "45.3"], nome: "Privado (Abdib)" },
                { r: ["infra", "50"], nome: "Federal pago (RTN)" },
              ],
              nota: "Abdib é entidade setorial; 2016 estimado (1,94% do PIB).",
            },
          ],
        },
        {
          titulo: "Transporte federal",
          graficos: [
            {
              titulo: "Investimento federal pago em transporte",
              tipo: "barras",
              series: [{ r: ["infra", "50.1"], nome: "Função Transporte (GND 4)" }],
            },
            {
              titulo: "Modais: despesa empenhada",
              sub: "Subfunções do orçamento (despesa total, não só investimento)",
              tipo: "categorias",
              series: [
                { r: ["infra", "52", "Empenhado"], nome: "Rodovias" },
                { r: ["infra", "53", "Empenhado"], nome: "Ferrovias" },
                { r: ["infra", "56b", "Empenhado"], nome: "Mobilidade urbana" },
                { r: ["infra", "56a", "Empenhado"], nome: "Saneamento" },
                { r: ["infra", "54", "Empenhado"], nome: "Portos" },
                { r: ["infra", "55", "Empenhado"], nome: "Aeroportos" },
              ],
            },
          ],
        },
        { titulo: "Tabela completa", tabela: ["privado", "infra"] },
      ],
    },

    {
      id: "fontes",
      menu: "Fontes",
      titulo: "Fontes e metodologia",
      desc: "Origem de cada dado, grau de confiabilidade, itens não localizados e regras aplicadas.",
      niveis: [
        { titulo: "Classificação dos dados", html: "legenda" },
        { titulo: "Fontes consultadas", html: "fontes" },
        { titulo: "Dados não localizados ou aproximados", html: "tentativas" },
        { titulo: "Regras metodológicas", html: "regras" },
      ],
    },
  ];
})();
