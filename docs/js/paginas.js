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
      trilha: ["PIB", "VAB + impostos", "Agro · Indústria · Serviços", "Atividades"],
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
          desc: "Agropecuária + indústria + serviços + impostos = PIB",
          graficos: [
            {
              titulo: "Composição do PIB",
              sub: "Em \"% do PIB\" as barras somam 100%",
              tipo: "empilhado",
              series: [
                { r: ["pib", "2"], nome: "Agropecuária" },
                { r: ["pib", "3"], nome: "Indústria" },
                { r: ["pib", "4"], nome: "Serviços" },
                { r: ["pib", "1.2"], nome: "Impostos líquidos" },
              ],
              nota: "Impostos líquidos = impostos sobre produtos (ICMS, IPI, ISS, PIS/Cofins, imposto de importação) − subsídios. As atividades são medidas pelo que o produtor recebe (VAB); o PIB, pelo preço pago pelo comprador — a diferença é essa camada de impostos (~14% do PIB). Não é a carga tributária total: IR e contribuições sobre a folha já estão dentro do VAB.",
            },
            {
              titulo: "Participação no PIB",
              sub: "VAB da atividade ÷ PIB",
              tipo: "linhas",
              series: [
                { r: ["pib", "7c'"], nome: "Serviços" },
                { r: ["pib", "7b"], nome: "Indústria" },
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
      trilha: ["Despesa total", "Estágios", "Investimentos"],
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
        { titulo: "Tabela completa", tabela: ["loa"] },
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
      id: "fomento",
      menu: "Crédito e fomento",
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
