/* "A quem interessa o que está ocorrendo": quem ganha e quem perde com os números
 * de cada página — análise de grupos afetados (stakeholders), não de partidos.
 *
 * Cada entrada: { grupo, texto } — o grupo beneficiado/prejudicado e por quê,
 * sempre amarrado a um número desta página. Não é avaliação de mérito (isso é o
 * bloco "Avaliação"): aqui o critério é só "quem sente o efeito, para melhor ou
 * para pior", mesmo quando o efeito geral é considerado positivo ou negativo.
 */
(function () {
  window.BENEFICIARIOS = {
    visao: {
      resumo: "Todo grande número fiscal redistribui algo: de um lado quem recebe juros, salário e benefícios; do outro, quem paga a conta hoje ou vai pagar amanhã.",
      ganham: [
        { grupo: "Quem detém título público", texto: "Juros de R$ 1,0 tri em 2025 (7,9% do PIB) são renda para bancos, fundos e investidores que financiam a dívida — uma das aplicações mais rentáveis do país." },
        { grupo: "Trabalhadores com carteira assinada", texto: "Emprego formal recorde (48,5 milhões) e desemprego no menor nível da série (5,6%)." },
        { grupo: "Beneficiários do INSS e do Bolsa Família", texto: "Previdência e transferência de renda cresceram acima do PIB no período." },
        { grupo: "Exportadores do agronegócio", texto: "Câmbio mais depreciado e preços de commodities elevam a receita em reais." },
      ],
      perdem: [
        { grupo: "Contribuintes futuros", texto: "A dívida bruta subiu de 69,8% para 78,6% do PIB: alguém vai pagar essa conta, via impostos futuros ou inflação." },
        { grupo: "Quem depende de investimento público", texto: "Com FBCF pública travada, obras, saneamento e transporte ficam represados." },
        { grupo: "Gerações futuras", texto: "Herdam uma dívida maior e um custo de juros que já supera o gasto com saúde e educação somados." },
        { grupo: "Quem toma crédito", texto: "Selic de 15% encarece financiamento de casa, carro, capital de giro e cartão para toda a economia." },
      ],
    },

    economia: {
      resumo: "A estrutura produtiva favorece quem já exporta ou empresta dinheiro, e penaliza quem depende de crédito barato ou de obra parada.",
      ganham: [
        { grupo: "Agronegócio exportador", texto: "Agropecuária subiu de 4,9% para 6,1% do PIB, com boa parte da produção destinada à exportação." },
        { grupo: "Setor financeiro", texto: "Atividades financeiras saltaram para 7,3% do PIB em 2025, com a Selic em 15%." },
        { grupo: "Petroleiras e mineradoras", texto: "A indústria extrativa chegou a 4,7% do PIB em 2022 com o petróleo caro." },
      ],
      perdem: [
        { grupo: "Construção civil e quem precisa de moradia", texto: "O setor encolheu 5% em termos reais entre 2016 e 2025." },
        { grupo: "Indústria de transformação", texto: "Ficou praticamente estagnada (11,8% do PIB em 2025, abaixo do pico de 2022)." },
        { grupo: "Quem toma crédito para produzir", texto: "Juros altos encarecem capital de giro e investimento produtivo, favorecendo quem já tem caixa." },
      ],
    },

    receitas: {
      resumo: "Quem vive de salário e consumo carrega proporcionalmente mais imposto do que quem vive de patrimônio e dividendos.",
      ganham: [
        { grupo: "Acionistas e sócios de empresas", texto: "Os gastos tributários somam R$ 587 bi (4,6% do PIB); dividendos foram isentos de Imposto de Renda até 2025." },
        { grupo: "Setores com renúncia fiscal setorial", texto: "Parte dos R$ 587 bi em renúncias beneficia setores específicos, não a população em geral." },
        { grupo: "O Tesouro em anos de commodities altas", texto: "Royalties e dividendos de estatais somaram 2,2% do PIB em receita em 2022, aliviando a necessidade de outros tributos naquele ano." },
      ],
      perdem: [
        { grupo: "Consumidores de baixa renda", texto: "O peso do consumo na arrecadação torna o sistema regressivo: quem gasta toda a renda paga proporcionalmente mais imposto." },
        { grupo: "Assalariados sem outras fontes de renda", texto: "Pagam Imposto de Renda na fonte sem os mesmos mecanismos de planejamento tributário disponíveis a rendas de capital." },
        { grupo: "Serviços públicos, indiretamente", texto: "Cada real de renúncia fiscal é um real a menos disponível para saúde, educação ou investimento." },
      ],
    },

    despesas: {
      resumo: "A despesa obrigatória protege quem já está dentro do sistema (aposentados, servidores) e deixa pouco espaço para quem precisa de serviços novos.",
      ganham: [
        { grupo: "Aposentados e pensionistas do RGPS", texto: "A previdência é a maior fatia da despesa primária (~8% do PIB) e cresce de forma praticamente automática." },
        { grupo: "Redes de ensino mais pobres", texto: "A complementação da União ao Fundeb subiu de 0,22% para 0,47% do PIB." },
        { grupo: "Servidores públicos", texto: "O gasto com pessoal ficou estável mesmo com o teto de gastos, protegendo salários e carreiras." },
      ],
      perdem: [
        { grupo: "Quem depende de obra e investimento público", texto: "As despesas discricionárias caíram a 1,5% do PIB em 2022: é a variável de ajuste quando o orçamento aperta." },
        { grupo: "Quem tenta emplacar uma política nova", texto: "Com quase tudo pré-comprometido, sobra pouco espaço fiscal para programas inéditos." },
        { grupo: "Pagadores de impostos futuros", texto: "Juros do Governo Central (7,0% do PIB em 2025) competem por espaço com qualquer despesa nova." },
      ],
    },

    divida: {
      resumo: "A dívida transfere renda de quem paga impostos para quem financia o governo — em geral, do conjunto da população para uma faixa mais rica que detém títulos públicos.",
      ganham: [
        { grupo: "Bancos, fundos e grandes investidores", texto: "Recebem R$ 1,0 tri por ano em juros (7,9% do PIB) — um dos maiores fluxos de renda do país." },
        { grupo: "Quem aplica em renda fixa/Tesouro Direto", texto: "Juros reais elevados tornam a dívida pública um investimento atrativo mesmo para pequenos poupadores." },
      ],
      perdem: [
        { grupo: "Todo contribuinte", texto: "Os juros pagos vêm de impostos: quanto mais alta a Selic, maior a fatia do orçamento dedicada a remunerar quem já tem capital." },
        { grupo: "Empresas que dependem de crédito", texto: "Juros de mercado sobem junto com a Selic, encarecendo capital de giro e investimento." },
        { grupo: "Quem defende mais gasto social", texto: "Cada ponto percentual a mais de juros compete diretamente com espaço para saúde, educação e investimento." },
      ],
    },

    orcamento: {
      resumo: "Quando o orçamento aperta, o investimento é cortado primeiro — o que afeta quem depende de obra pública, não quem já recebe direito garantido.",
      ganham: [
        { grupo: "Órgãos com despesa obrigatória", texto: "Previdência e pessoal são protegidos por lei e raramente sofrem contingenciamento." },
        { grupo: "Parlamentares com emendas", texto: "Emendas seguem sendo pagas mesmo quando o investimento ordinário do Executivo é cortado (fora do escopo desta planilha, mas parte do mesmo debate orçamentário)." },
      ],
      perdem: [
        { grupo: "Empresas de construção e seus trabalhadores", texto: "O investimento pago pela União oscilou entre 0,19% e 0,30% do PIB — obras contratadas ficam com pagamento incerto." },
        { grupo: "Municípios com obras federais paralisadas", texto: "O investimento pago incluindo restos a pagar (R$ 69,9 bi em 2025) é quase o dobro do pago no exercício: obras se arrastam de um ano para o outro." },
        { grupo: "Ministérios sem despesa obrigatória protegida", texto: "Saúde, Educação e Defesa oscilam mais ano a ano do que Previdência." },
      ],
    },

    federativo: {
      resumo: "Estados e municípios ganham receita garantida por regra constitucional, mas a área social sem regra clara (assistência social) fica para trás.",
      ganham: [
        { grupo: "Estados e municípios em geral", texto: "FPE + FPM somaram R$ 362 bi reais em 2025, alta real de 56% sobre 2016." },
        { grupo: "Redes municipais de saúde e educação", texto: "SUS fundo a fundo (+65% real) e Fundeb (+182% real) cresceram bem acima da inflação." },
      ],
      perdem: [
        { grupo: "Quem depende do PNAE", texto: "O repasse da merenda escolar caiu 23% em termos reais entre 2016 e 2022." },
        { grupo: "Assistência social municipal", texto: "Não há série pública de repasses do FNAS/SUAS — a área menos visível é também a que corre mais risco de ser subfinanciada sem que ninguém perceba." },
        { grupo: "Municípios pequenos e dependentes de FPM", texto: "Ficam mais expostos a qualquer mudança nas regras de partilha, por terem pouca receita própria." },
      ],
    },

    social: {
      resumo: "Saúde e educação ganharam fôlego em 2025; a segurança pública federal ficou de fora da prioridade orçamentária.",
      ganham: [
        { grupo: "Pacientes do SUS", texto: "A saúde paga subiu 51% em termos reais entre 2016 e 2025." },
        { grupo: "Alunos da rede pública", texto: "A educação, após cair a 1,09% do PIB em 2022, voltou a 1,37% em 2025." },
        { grupo: "Aposentados do INSS", texto: "A previdência segue sendo a maior prioridade do gasto social (8,8% do PIB)." },
      ],
      perdem: [
        { grupo: "Quem depende de segurança pública federal", texto: "A função ficou estagnada em 0,12%–0,13% do PIB nos quatro anos, sem prioridade orçamentária." },
        { grupo: "Quem passou pela escola/posto de saúde em 2022", texto: "Foi o ano de menor gasto real em educação (1,09% do PIB) do período." },
        { grupo: "Jovens contribuintes", texto: "Vão sustentar uma previdência que cresce mais rápido que a população economicamente ativa." },
      ],
    },

    seguranca_pub: {
      resumo: "A violência letal caiu para quase todo mundo, mas duas populações específicas — mulheres e vítimas de ação policial — viram o risco aumentar.",
      ganham: [
        { grupo: "População em geral", texto: "A taxa de Mortes Violentas Intencionais caiu de 30,2 para 19,1 por 100 mil habitantes." },
        { grupo: "Quem é alvo de roubo e latrocínio", texto: "As duas taxas caíram com força: roubo −66%, latrocínio −70%." },
      ],
      perdem: [
        { grupo: "Mulheres", texto: "Os casos de feminicídio mais que dobraram no período (621 → 1.571, +153%)." },
        { grupo: "Pessoas abordadas pela polícia", texto: "Mortes por intervenção policial subiram 56% (4.223 → 6.602), na contramão da queda geral da violência." },
        { grupo: "Vítimas de violência sexual", texto: "Os registros de estupro subiram 70%, o que pode refletir tanto mais casos quanto mais denúncias — mas em qualquer leitura, mais pessoas atingidas." },
        { grupo: "A própria transparência pública", texto: "O efetivo policial do país nem é medido: quem cobra política de segurança com dados não tem o número mais básico de capacidade do Estado." },
      ],
    },

    educacao: {
      resumo: "Estudantes de baixa renda ganharam mais apoio; quem dependia do crédito educativo privado perdeu espaço.",
      ganham: [
        { grupo: "Estudantes de baixa renda no ensino superior", texto: "A Bolsa Permanência (indígenas, quilombolas, baixa renda) subiu 168% em termos reais entre 2022 e 2025." },
        { grupo: "Redes municipais de ensino", texto: "A complementação da União ao Fundeb quase quadruplicou em termos reais desde 2016." },
        { grupo: "Quem faz curso a distância", texto: "A participação do EAD nas matrículas de graduação saltou de 18,6% para 50,7% — mais gente com acesso ao diploma." },
      ],
      perdem: [
        { grupo: "Quem dependia do Fies para cursar faculdade privada", texto: "O impacto primário do programa caiu de R$ 10,9 bi (2016) para R$ 2,2 bi (2025): menos crédito disponível." },
        { grupo: "Estudantes de 2019 a 2022", texto: "Passaram pela escola com a função Educação em queda real de 15%, justo no período que incluiu a pandemia." },
        { grupo: "Quem faz EAD sem dado de qualidade", texto: "A expansão do EAD não vem acompanhada, nesta planilha, de dado de evasão ou de qualidade do curso — o risco existe, mas não é medido aqui." },
      ],
    },

    afirmativas: {
      resumo: "Famílias pobres e grupos historicamente excluídos ganharam mais renda e mais vagas; a agenda racial específica segue com orçamento irrisório.",
      ganham: [
        { grupo: "Famílias do Bolsa Família", texto: "18,7 milhões de famílias atendidas em 2025, com valor médio maior por família." },
        { grupo: "Idosos e pessoas com deficiência de baixa renda", texto: "O BPC subiu de R$ 75,9 bi para R$ 127,2 bi reais." },
        { grupo: "Estudantes indígenas, quilombolas e de baixa renda", texto: "A Bolsa Permanência quase triplicou em termos reais desde 2022." },
      ],
      perdem: [
        { grupo: "Agenda de igualdade racial", texto: "O programa específico pagou só R$ 58 mi em 2025 e não existiu em 2022 — valor mínimo diante do problema que pretende enfrentar." },
        { grupo: "Quem fica fora do Cadastro Único", texto: "Toda política focalizada deixa de fora quem não está cadastrado, mesmo em situação de vulnerabilidade." },
        { grupo: "Classe média que usava o Fies", texto: "O crédito educativo encolheu, fechando uma porta de acesso ao ensino superior privado." },
      ],
    },

    corrupcao: {
      resumo: "Como a apuração de corrupção depende de prioridade política e de regras vigentes em cada momento, a queda nas operações e prisões muda quem corre risco de ser responsabilizado — e quem perde com a impunidade.",
      ganham: [
        { grupo: "Investigados em processos que perderam prioridade", texto: "As prisões por corrupção caíram 90% entre 2019 e 2022 — menos risco de responsabilização no curto prazo para quem está sob investigação." },
        { grupo: "Quem defende que o combate à corrupção estava excessivo", texto: "A queda nas operações e prisões é lida por essa visão como normalização, não como impunidade." },
      ],
      perdem: [
        { grupo: "Cofres públicos", texto: "Menos operações e prisões tendem a significar menos recursos desviados recuperados e menor efeito dissuasório sobre novos desvios." },
        { grupo: "Confiança pública nas instituições", texto: "Um CPI estagnado em 35 pontos mostra que, para especialistas internacionais, o Brasil não avançou no combate à corrupção percebida entre 2019 e 2025." },
      ],
    },

    fomento: {
      resumo: "O crédito público concentra benefício em quem já tem escala para tomar empréstimo grande; o custo é dividido por todos os contribuintes.",
      ganham: [
        { grupo: "Grandes empresas tomadoras do BNDES", texto: "Os desembolsos voltaram a R$ 169,7 bi em 2025 (1,33% do PIB)." },
        { grupo: "Produtores rurais de médio e grande porte", texto: "O Plano Safra anunciado chegou a 4,75% do PIB no ciclo 2025/26." },
      ],
      perdem: [
        { grupo: "Contribuintes em geral", texto: "Os benefícios financeiros e creditícios (subsídio implícito do crédito público) somaram 1,35% do PIB em 2025 — custo fiscal pago por todos." },
        { grupo: "Pequenos negócios sem acesso a crédito direcionado", texto: "Crédito subsidiado tende a concentrar-se em quem já tem relacionamento bancário e escala." },
        { grupo: "Ciência básica", texto: "O orçamento de C&T oscilou muito ano a ano, dificultando planejamento de longo prazo." },
      ],
    },

    emprego: {
      resumo: "Quem tem carteira assinada ganhou; quem está na informalidade nem aparece nestes números.",
      ganham: [
        { grupo: "Trabalhadores formais", texto: "Estoque de empregos formais em recorde: 48,5 milhões de vínculos, +10 milhões desde 2016." },
        { grupo: "Quem ganha salário mínimo", texto: "A política de valorização do mínimo eleva o piso de quem está na base da pirâmide salarial." },
      ],
      perdem: [
        { grupo: "Trabalhadores informais", texto: "Não aparecem nestas estatísticas de carteira assinada — a informalidade é um ponto cego desta série de dados." },
        { grupo: "Quem busca o primeiro emprego", texto: "O desemprego caiu na média, mas a taxa entre jovens costuma ser bem mais alta do que a taxa geral (não detalhado nesta planilha)." },
      ],
    },

    externo: {
      resumo: "Quem exporta ou tem ativos em dólar ganha com o câmbio; quem importa insumos ou consome bens importados paga mais caro.",
      ganham: [
        { grupo: "Exportadores de commodities", texto: "Exportações bateram recorde de US$ 348 bi em 2025, com saldo comercial de US$ 68 bi." },
        { grupo: "Quem tem poupança em dólar", texto: "Um real mais depreciado favorece quem já detém ativos na moeda americana." },
      ],
      perdem: [
        { grupo: "Importadores de insumos e bens de capital", texto: "Câmbio depreciado encarece a modernização industrial que depende de máquinas importadas." },
        { grupo: "Consumidores de eletrônicos e bens importados", texto: "Pagam mais caro por produtos cujo preço segue o dólar." },
      ],
    },

    investimento: {
      resumo: "O capital privado entrou forte em concessões lucrativas; áreas de baixo retorno financeiro (mas alto retorno social) seguem dependendo do Estado.",
      ganham: [
        { grupo: "Concessionárias e investidores privados", texto: "Investimento privado em infraestrutura chegou a R$ 235 bi em 2025, 84% do total do setor." },
        { grupo: "Grandes construtoras com capacidade de concessão", texto: "Concentram a maior parte dos novos contratos de infraestrutura." },
      ],
      perdem: [
        { grupo: "Regiões que dependem de ferrovia", texto: "O investimento federal em ferrovias foi de apenas R$ 60 milhões empenhados em 2025 — praticamente zerado." },
        { grupo: "Municípios pequenos sem escala para concessão", texto: "Saneamento e transporte em áreas de baixa rentabilidade financeira seguem sem interesse do capital privado." },
        { grupo: "Quem depende de investimento público direto", texto: "Caiu de 0,25% para 0,16% do PIB — o Estado saiu de cena justamente onde o privado não entra." },
      ],
    },
  };
})();
