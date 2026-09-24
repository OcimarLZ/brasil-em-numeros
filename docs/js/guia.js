/* Guia de uso do site — primeira página do menu. Não vem de planilha: é um texto
 * de orientação com links diretos (#id da página) para cada área, funcionando como
 * um mapa do site. Ver render em app.js (HTML.guia_* + secaoDicas()).
 */
(function () {
  window.GUIA = {
    grupos: [
      {
        titulo: "As contas do país",
        dicas: [
          { pergunta: "Quanto vale a economia brasileira, e como estão as contas públicas?", resposta: "PIB, arrecadação, despesa e dívida lado a lado, com os grandes números de 2025 e a variação desde 2016.", pagina: "visao", label: "Visão geral" },
          { pergunta: "De onde vem o dinheiro do governo?", resposta: "Da arrecadação total aos tributos que mais pesam (Imposto de Renda, Cofins, INSS) e ao que o Estado deixa de arrecadar.", pagina: "receitas", label: "Receitas" },
          { pergunta: "Para onde vai o dinheiro do governo?", resposta: "Da despesa primária total a previdência e pessoal, e o resultado fiscal de cada ano.", pagina: "despesas", label: "Despesas" },
          { pergunta: "Quanto o Brasil deve, e quanto isso custa?", resposta: "Dívida bruta e líquida, juros pagos e o peso da rolagem da dívida.", pagina: "divida", label: "Dívida e juros" },
          { pergunta: "O orçamento aprovado é o que realmente é pago?", resposta: "Dotação, empenho, liquidação e pagamento — inclusive por ministério.", pagina: "orcamento", label: "Orçamento" },
          { pergunta: "Quanto a União repassa a estados e municípios?", resposta: "FPE, FPM e as transferências específicas para saúde e educação.", pagina: "federativo", label: "Pacto federativo" },
        ],
      },
      {
        titulo: "Estrutura da economia",
        dicas: [
          { pergunta: "O que o Brasil produz?", resposta: "PIB por setor — agropecuária, indústria, comércio e serviços — e como isso mudou em 10 anos.", pagina: "economia", label: "PIB e produção" },
          { pergunta: "Como funciona o crédito público (BNDES, Plano Safra)?", resposta: "Desembolsos, aprovações e o esforço nacional em pesquisa e desenvolvimento.", pagina: "fomento", label: "Fomento" },
          { pergunta: "Como está o mercado de trabalho?", resposta: "Desemprego, carteira assinada e o saldo de empregos formais desde 2016.", pagina: "emprego", label: "Emprego" },
          { pergunta: "O Brasil exporta mais do que importa?", resposta: "Balança comercial e investimento estrangeiro direto no país.", pagina: "externo", label: "Setor externo" },
          { pergunta: "Quem investe em estradas, portos e energia no Brasil?", resposta: "Investimento público × privado em infraestrutura, por modal.", pagina: "investimento", label: "Investimento" },
        ],
      },
      {
        titulo: "Áreas sociais e segurança",
        dicas: [
          { pergunta: "Quanto o governo gasta com saúde, educação e aposentadoria?", resposta: "Previdência, saúde e educação lado a lado, com a segurança pública federal.", pagina: "social", label: "Áreas sociais" },
          { pergunta: "A violência no Brasil está caindo ou subindo?", resposta: "Homicídio, feminicídio, roubo e letalidade policial, com o orçamento da função Segurança.", pagina: "seguranca_pub", label: "Segurança" },
          { pergunta: "Quantos alunos o Brasil tem, e como vai o aprendizado?", resposta: "Matrículas, taxas de aprovação, Enem e Sisu, além de todo o gasto federal com educação.", pagina: "educacao", label: "Educação" },
          { pergunta: "Como funciona o Bolsa Família e o BPC?", resposta: "Transferência de renda, assistência estudantil e os programas de igualdade racial.", pagina: "afirmativas", label: "Políticas afirmativas" },
        ],
      },
      {
        titulo: "Instituições e informação",
        dicas: [
          { pergunta: "O combate à corrupção está avançando ou recuando?", resposta: "Índices de percepção, operações da CGU e prisões da Polícia Federal — dados escassos, mas reais.", pagina: "corrupcao", label: "Corrupção" },
          { pergunta: "Essa notícia que circulou nas redes é verdadeira?", resposta: "Checagens já publicadas por Aos Fatos, Agência Lupa e Comprova sobre urnas eletrônicas e a campanha 2026.", pagina: "fato_ou_fake", label: "Fato ou Fake" },
          { pergunta: "De onde vêm esses números?", resposta: "A lista completa de fontes, o grau de confiabilidade de cada dado e o que não foi encontrado.", pagina: "fontes", label: "Fontes" },
        ],
      },
    ],
  };
})();
