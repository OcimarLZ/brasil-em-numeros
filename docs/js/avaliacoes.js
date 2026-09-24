/* Avaliação analítica por página: impactos positivos, negativos e pontos de atenção.
 *
 * Critérios (tags):
 *   fis = Sustentabilidade fiscal
 *   ext = Autonomia externa (baixa dependência de economias externas)
 *   jus = Justiça social
 *   bem = Bem-estar social
 *   inv = Atratividade ao investimento
 *
 * tipo: "pos" (impacto positivo) | "neg" (impacto negativo) | "at" (ponto de atenção)
 * Os números citados vêm da planilha (valores reais em R$ de dez/2025 ou % do PIB).
 */
(function () {
  window.CRITERIOS = {
    fis: { nome: "Sustentabilidade fiscal", desc: "Contas públicas capazes de financiar o Estado sem trajetória explosiva de dívida e juros." },
    ext: { nome: "Autonomia externa", desc: "Baixa vulnerabilidade a choques externos: contas externas sólidas, dívida em moeda local, pauta diversificada." },
    jus: { nome: "Justiça social", desc: "Redução de desigualdades de renda, raça e região; tributação e gasto progressivos." },
    bem: { nome: "Bem-estar social", desc: "Emprego, renda, saúde, educação, segurança e serviços públicos de qualidade." },
    inv: { nome: "Atratividade ao investimento", desc: "Estabilidade macro, juros civilizados, infraestrutura, segurança jurídica e inovação." },
  };

  window.AVALIACOES = {
    visao: {
      resumo: "O período mostra melhora forte no mercado de trabalho e no gasto social, contas externas sólidas e uma fragilidade central: dívida e juros em alta com resultado primário negativo.",
      cards: [
        { tipo: "pos", titulo: "Crescimento e emprego", crit: ["bem", "jus"], texto: "PIB real cresceu 31% entre 2016 e 2025 (R$ 9,7 tri → R$ 12,7 tri) e o desemprego caiu de 11,5% para 5,6%, o menor da série da PNAD Contínua." },
        { tipo: "pos", titulo: "Contas externas sem aperto", crit: ["ext", "inv"], texto: "Saldo comercial positivo nos quatro anos (US$ 40 bi → US$ 68 bi) e investimento direto estável entre US$ 69 bi e US$ 78 bi por ano: o país não depende de crédito externo para fechar suas contas." },
        { tipo: "neg", titulo: "Dívida e juros em alta", crit: ["fis", "inv"], texto: "Dívida bruta subiu de 69,8% para 78,6% do PIB e os juros do setor público chegaram a R$ 1,0 tri (7,9% do PIB) em 2025, o maior custo do período — mais que o dobro do gasto federal pago com saúde e educação somados." },
        { tipo: "neg", titulo: "Primário negativo em 3 de 4 anos", crit: ["fis"], texto: "O único superávit (2022) veio de receitas extraordinárias ligadas a petróleo, dividendos e concessões — não de um ajuste estrutural." },
        { tipo: "at", titulo: "Investimento baixo", crit: ["inv", "bem"], texto: "A FBCF ficou entre 15,5% e 17,8% do PIB, abaixo dos 20%–25% normalmente associados a crescimento sustentado em economias emergentes." },
      ],
      praticas: [
        "Regra fiscal crível, com metas de resultado primário capazes de estabilizar e depois reduzir a dívida/PIB.",
        "Reduzir o prêmio de risco (previsibilidade fiscal e institucional) para permitir juros estruturalmente menores.",
        "Elevar o investimento para perto de 20% do PIB, com prioridade a infraestrutura e inovação.",
        "Preservar e focalizar o gasto social, com avaliação de impacto e portas de saída pelo emprego.",
      ],
    },

    economia: {
      resumo: "A estrutura produtiva ganhou peso no agro e manteve a indústria de transformação estável, mas segue sensível ao preço de commodities e com construção fraca.",
      cards: [
        { tipo: "pos", titulo: "Agro mais forte", crit: ["ext", "inv"], texto: "A agropecuária passou de 4,9% para 6,1% do PIB (+63% reais): setor competitivo, gerador de divisas e atrativo para investimento." },
        { tipo: "pos", titulo: "Transformação preservada", crit: ["inv", "bem"], texto: "A indústria de transformação cresceu 43% em termos reais (R$ 1,05 tri → R$ 1,50 tri) e subiu de 10,8% para 11,8% do PIB, interrompendo a perda de participação." },
        { tipo: "neg", titulo: "Dependência de petróleo e minério", crit: ["ext"], texto: "A indústria extrativa oscilou de 0,9% para 4,7% e depois 3,2% do PIB, acompanhando o preço internacional — a economia fica exposta ao ciclo de commodities." },
        { tipo: "at", titulo: "Construção encolheu", crit: ["inv", "bem"], texto: "O VAB da construção caiu 5% em termos reais entre 2016 e 2025, sinal de fraqueza em infraestrutura e habitação." },
        { tipo: "at", titulo: "Finanças ganham peso com juros altos", crit: ["inv", "jus"], texto: "As atividades financeiras saltaram para 7,3% do PIB em 2025, com Selic de 15%. Sem aumento do crédito produtivo, isso indica renda financeira crescendo mais que a economia real." },
      ],
      praticas: [
        "Aumentar a complexidade econômica: agregar valor às cadeias de alimentos, minerais e energia.",
        "Implementar a reforma tributária do consumo (EC 132/2023) para reduzir cumulatividade e custo de conformidade.",
        "Ganhos de produtividade via qualificação, digitalização e concorrência.",
      ],
    },

    receitas: {
      resumo: "A arrecadação cresceu acima do PIB e a receita líquida ficou estável em ~18% do PIB, mas parte dela é volátil (commodities) e as renúncias seguem elevadas.",
      cards: [
        { tipo: "pos", titulo: "Base de receita robusta", crit: ["fis"], texto: "A arrecadação federal cresceu 44% em termos reais e subiu de 20,6% para 22,7% do PIB; a receita líquida se estabilizou em torno de 18,3% do PIB desde 2019." },
        { tipo: "pos", titulo: "Mais peso do imposto sobre a renda", crit: ["jus"], texto: "O Imposto de Renda passou de 5,4% para 6,8% do PIB. Tributar mais a renda do que o consumo torna o sistema menos regressivo." },
        { tipo: "neg", titulo: "Receitas voláteis", crit: ["fis", "ext"], texto: "Royalties e dividendos somaram 2,2% do PIB em 2022 e 1,5% em 2025 (0,4% em 2016): uma fatia relevante da receita depende do preço do petróleo e do lucro de estatais." },
        { tipo: "neg", titulo: "Renúncias fiscais elevadas", crit: ["jus", "fis"], texto: "Os gastos tributários subiram de 4,3% para 4,6% do PIB (R$ 587 bi em 2025) — mais que todo o gasto federal pago em saúde e educação (3,2% do PIB). Boa parte beneficia setores e rendas mais altas." },
      ],
      praticas: [
        "Revisar periodicamente os gastos tributários com avaliação de custo-benefício e prazo de validade.",
        "Destinar receitas extraordinárias de recursos naturais a abatimento de dívida ou investimento, não a despesa permanente.",
        "Ampliar a progressividade da tributação da renda, com transição previsível.",
      ],
    },

    despesas: {
      resumo: "A despesa primária voltou a crescer após o teto de gastos, concentrada em itens obrigatórios; o espaço para investimento e custeio discricionário é pequeno.",
      cards: [
        { tipo: "pos", titulo: "Pessoal sob controle", crit: ["fis"], texto: "O gasto com pessoal caiu de 4,1% para 3,2% do PIB entre 2016 e 2025, liberando espaço orçamentário." },
        { tipo: "pos", titulo: "Mais recursos para a educação básica", crit: ["jus", "bem"], texto: "A complementação da União ao Fundeb subiu de 0,22% para 0,47% do PIB, reforçando redes de ensino de estados e municípios mais pobres." },
        { tipo: "neg", titulo: "Rigidez orçamentária", crit: ["fis", "inv"], texto: "Previdência (~8% do PIB), BPC (0,8% → 1,0%) e precatórios (0,16% → 0,34%) crescem de forma automática; as despesas discricionárias ficaram em apenas 1,6% do PIB." },
        { tipo: "neg", titulo: "Déficit nominal alto", crit: ["fis", "inv"], texto: "O resultado nominal do Governo Central foi de −7,5% do PIB em 2025 (R$ 951 bi), puxado por juros de 7,0% do PIB." },
      ],
      praticas: [
        "Revisão periódica de gastos (spending review) com metas de economia e realocação.",
        "Limite de crescimento real da despesa com gatilhos de correção, como no Regime Fiscal Sustentável.",
        "Avaliar regras de indexação de benefícios para conciliar proteção social e sustentabilidade.",
        "Proteger o investimento público dentro da regra fiscal.",
      ],
    },

    divida: {
      resumo: "A dívida é quase toda interna e em reais, o que reduz a vulnerabilidade externa, mas o nível e o custo estão em trajetória de alta.",
      cards: [
        { tipo: "pos", titulo: "Dívida em moeda local", crit: ["ext"], texto: "Cerca de 96% da Dívida Pública Federal é mobiliária interna (R$ 8,3 tri de R$ 8,6 tri em 2025): uma desvalorização cambial não faz a dívida explodir." },
        { tipo: "neg", titulo: "Trajetória de alta", crit: ["fis", "inv"], texto: "A dívida líquida subiu sem interrupção (46,1% → 65,2% do PIB) e a bruta atingiu 78,6%, nível elevado para uma economia emergente." },
        { tipo: "neg", titulo: "Juros consomem o orçamento", crit: ["fis", "jus"], texto: "R$ 1,0 tri em juros em 2025 (7,9% do PIB), cerca de 2,5 vezes o gasto federal pago em saúde e educação. Juros transferem renda para detentores de títulos." },
        { tipo: "at", titulo: "Rolagem pesada", crit: ["fis", "inv"], texto: "O refinanciamento chegou a R$ 1,4 tri por ano (11%–14% do PIB em 2022–2025): o Tesouro fica exposto às condições de mercado a cada leilão." },
      ],
      praticas: [
        "Superávit primário consistente, suficiente para estabilizar a dívida/PIB.",
        "Alongar prazos e reduzir a parcela atrelada à Selic.",
        "Coordenação fiscal-monetária que permita queda sustentável dos juros.",
      ],
    },

    orcamento: {
      resumo: "O orçamento é bem executado no agregado, mas o investimento é pequeno, pouco executado e dependente de restos a pagar.",
      cards: [
        { tipo: "pos", titulo: "Investimento em recuperação", crit: ["inv", "bem"], texto: "Os investimentos pagos no exercício chegaram a R$ 37,8 bi em 2025, o maior valor real do período (+69% sobre 2022)." },
        { tipo: "neg", titulo: "Investimento mínimo", crit: ["inv"], texto: "O investimento pago pela União oscilou entre 0,19% e 0,30% do PIB — insuficiente até para repor a depreciação da infraestrutura federal." },
        { tipo: "neg", titulo: "Baixa execução do investimento", crit: ["inv", "fis"], texto: "Só 37% a 47% da dotação inicial de investimentos é paga no ano, contra 87%–91% da despesa total: o investimento é a variável de ajuste." },
        { tipo: "at", titulo: "Orçamento empurrado", crit: ["fis"], texto: "O investimento pago incluindo restos a pagar (RTN, R$ 69,9 bi em 2025) é quase o dobro do pago no exercício: obras se arrastam de um ano para o outro." },
        { tipo: "neg", titulo: "Rolagem da dívida domina o orçamento", crit: ["fis"], texto: "A rolagem/refinanciamento da dívida mobiliária chegou a R$ 2,16 tri reais em 2022 (18,7% do PIB) e R$ 1,66 tri em 2025 (13,0% do PIB) — muito maior que qualquer despesa primária isolada, incluindo pessoal (R$ 443 bi) e investimentos (R$ 80 bi) somados." },
      ],
      praticas: [
        "Carteira de investimentos plurianual, priorizada por análise custo-benefício.",
        "Reduzir a fragmentação do orçamento em pequenas ações sem escala.",
        "Transparência sobre restos a pagar e obras paralisadas.",
      ],
    },

    federativo: {
      resumo: "As transferências a estados e municípios cresceram em termos reais, tanto na partilha de receita (FPE/FPM) quanto nos repasses de saúde e educação, mas faltam dados para medir o total do pacto federativo.",
      cards: [
        { tipo: "pos", titulo: "Partilha de receita em alta", crit: ["jus", "bem"], texto: "FPE + FPM somaram R$ 362 bi reais em 2025 (2,84% do PIB), ante R$ 232 bi (2,39% do PIB) em 2016: mais recursos livres para estados e municípios, sobretudo os mais dependentes dessas transferências." },
        { tipo: "pos", titulo: "SUS fundo a fundo mais forte", crit: ["bem"], texto: "Os repasses líquidos do SUS a estados e municípios cresceram 65% em termos reais (R$ 99,6 bi → R$ 164,7 bi), de 1,03% para 1,29% do PIB." },
        { tipo: "neg", titulo: "Glosas reduzem o repasse à saúde", crit: ["bem", "fis"], texto: "O desconto entre o repasse bruto e o líquido do SUS soma bilhões todo ano (R$ 2,8 bi em 2016, R$ 5,3 bi em 2025): recursos anunciados que não chegam de fato aos municípios." },
        { tipo: "neg", titulo: "Assistência social invisível nos dados", crit: ["jus", "bem"], texto: "Não foi localizada uma série de repasses do FNAS/SUAS a estados e municípios para os 4 anos — o pacto federativo na assistência social é o menos transparente das três áreas centrais (saúde, educação, assistência)." },
        { tipo: "at", titulo: "PNAE perde valor real", crit: ["bem"], texto: "O repasse do PNAE caiu de R$ 5,3 bi para R$ 4,1 bi reais entre 2016 e 2022 (−23%), enquanto a complementação ao Fundeb quase quadruplicou no mesmo período — prioridades diferentes dentro da própria educação." },
      ],
      praticas: [
        "Publicar uma série consolidada do total de transferências da União a estados e municípios, por tipo e por área.",
        "Reduzir as glosas do SUS fundo a fundo ou explicar publicamente seus critérios.",
        "Tratar FNAS/SUAS com a mesma transparência de SUS e Fundeb.",
        "Regras de partilha estáveis, para dar previsibilidade orçamentária aos entes subnacionais.",
      ],
    },

    social: {
      resumo: "Saúde e educação ganharam recursos em 2025 após anos de estagnação; a previdência domina o gasto e a segurança segue marginal no orçamento federal.",
      cards: [
        { tipo: "pos", titulo: "Saúde com mais recursos", crit: ["bem", "jus"], texto: "A saúde paga subiu 51% em termos reais (R$ 155 bi → R$ 234 bi), chegando a 1,84% do PIB em 2025." },
        { tipo: "pos", titulo: "Previdência dos servidores contida", crit: ["fis", "jus"], texto: "O RPPS da União caiu em termos reais (R$ 133 bi → R$ 105 bi empenhados) após a reforma de 2019 (EC 103), reduzindo o peso do regime dos servidores no gasto." },
        { tipo: "neg", titulo: "Previdência domina o gasto", crit: ["fis", "jus"], texto: "A previdência paga pela União (8,8% do PIB) equivale a 2,8 vezes saúde e educação somadas; o envelhecimento da população vai pressionar ainda mais." },
        { tipo: "at", titulo: "Educação oscilou", crit: ["bem"], texto: "A educação paga caiu para R$ 125 bi (1,09% do PIB) em 2022, o mínimo do período, bem no pós-pandemia, e só se recuperou em 2025 (1,37%)." },
        { tipo: "at", titulo: "Segurança estagnada", crit: ["bem"], texto: "A segurança pública federal ficou em 0,12%–0,13% do PIB nos quatro anos." },
      ],
      praticas: [
        "Orçar por resultados: aprendizagem, atenção primária e redução de mortalidade.",
        "Ajustar regras previdenciárias à demografia de forma gradual e previsível.",
        "Integração federativa em segurança pública, com foco em inteligência e dados.",
      ],
    },

    seguranca_pub: {
      resumo: "A violência letal caiu de forma consistente nos quatro anos, mas o avanço é desigual entre tipos de crime: feminicídio e letalidade policial sobem enquanto homicídio e latrocínio caem.",
      cards: [
        { tipo: "pos", titulo: "Queda sustentada da violência letal", crit: ["bem"], texto: "A taxa de Mortes Violentas Intencionais caiu de 30,2 para 19,1 por 100 mil habitantes entre 2016 e 2025 (−37%), com queda em todos os quatro anos da série." },
        { tipo: "pos", titulo: "Homicídio doloso em queda acentuada", crit: ["bem"], texto: "O homicídio doloso caiu 39% em número absoluto (54.053 → 32.914) e a taxa disponível caiu de 18,8 para 15,4 por 100 mil habitantes (2019→2025)." },
        { tipo: "pos", titulo: "Latrocínio e roubo em queda", crit: ["bem"], texto: "Latrocínio caiu 70% (2.666 → 807 casos) e a taxa de roubos caiu 66% (837,9 → 286,3 por 100 mil habitantes)." },
        { tipo: "neg", titulo: "Feminicídio mais que dobrou", crit: ["jus", "bem"], texto: "Os casos de feminicídio subiram de 621 para 1.571 entre 2016 e 2025 (+153%) — na direção oposta de quase todos os outros indicadores de violência letal." },
        { tipo: "neg", titulo: "Letalidade policial em alta", crit: ["jus", "bem"], texto: "Mortes decorrentes de intervenção policial subiram 56% (4.223 → 6.602), mesmo com a queda geral da criminalidade violenta." },
        { tipo: "neg", titulo: "Estupro em alta constante", crit: ["jus", "bem"], texto: "Os registros de estupro subiram 70% (49.497 → 84.388) e a taxa foi de 24,0 para 39,5 por 100 mil habitantes — pode refletir tanto mais casos quanto mais denúncias." },
        { tipo: "at", titulo: "Dados básicos não existem", crit: ["fis", "bem"], texto: "O efetivo policial total do país (civil + militar) não foi localizado para nenhum dos quatro anos — um indicador básico de capacidade de Estado que deveria ser público e comparável." },
      ],
      praticas: [
        "Política nacional de dados de segurança, com séries públicas, comparáveis e sem quebras (o próprio FBSP precisa revisar retroativamente).",
        "Foco específico em feminicídio e letalidade policial, as duas séries em alta.",
        "Protocolos de uso da força e accountability para reduzir mortes por intervenção policial.",
        "Investimento em prevenção e rede de proteção à mulher, dado o crescimento do feminicídio.",
      ],
    },

    educacao: {
      resumo: "O gasto federal em educação caiu de 2016 a 2022 e foi recomposto em 2025. O Fundeb ampliado reforçou as redes mais pobres, mas o país ainda gasta pouco por aluno e aprende pouco.",
      cards: [
        { tipo: "pos", titulo: "Recomposição em 2025", crit: ["bem", "jus"], texto: "A função Educação paga subiu 39% em termos reais de 2022 a 2025 (R$ 125,5 bi → R$ 174,6 bi), de 1,09% para 1,37% do PIB." },
        { tipo: "pos", titulo: "Fundeb mais redistributivo", crit: ["jus"], texto: "A complementação da União ao Fundeb foi de 0,22% para 0,47% do PIB (R$ 21 bi → R$ 60 bi reais), reforçando as redes de ensino mais pobres." },
        { tipo: "pos", titulo: "Permanência no ensino superior", crit: ["jus"], texto: "A Bolsa Permanência (indígenas, quilombolas e baixa renda) subiu de R$ 152 mi para R$ 406 mi reais entre 2022 e 2025, e o PNAES voltou ao nível de 2016." },
        { tipo: "neg", titulo: "Seis anos de encolhimento", crit: ["bem", "inv"], texto: "Entre 2016 e 2022 a função Educação perdeu 15% em termos reais (R$ 147,6 bi → R$ 125,5 bi), atravessando a pandemia com menos recursos." },
        { tipo: "neg", titulo: "Merenda perdeu valor", crit: ["bem", "jus"], texto: "O repasse do PNAE caiu 23% em termos reais até 2022 (R$ 5,3 bi → R$ 4,1 bi) para cerca de 40 milhões de estudantes; em 2025 voltou a R$ 5,5 bi (orçado)." },
        { tipo: "at", titulo: "Pé-de-Meia fora do orçamento", crit: ["fis"], texto: "Os R$ 13 bi previstos em 2025 são pagos por fundo fora da LOA, o que reduz a transparência; o impacto sobre a evasão ainda precisa de avaliação." },
        { tipo: "at", titulo: "Fies encolheu", crit: ["fis", "jus"], texto: "O impacto primário caiu de R$ 10,9 bi (2016) para R$ 2,2 bi (2025): alívio fiscal, com menos acesso ao ensino superior privado pela via do crédito." },
        { tipo: "pos", titulo: "Aprovação subiu na educação básica", crit: ["bem"], texto: "A taxa de aprovação do ensino fundamental na rede pública foi de 94,3% (2019) para 97,0% (2025), e o abandono no ensino médio caiu de 6,5% para 2,5% (2022→2025)." },
        { tipo: "neg", titulo: "Matrículas na educação básica encolhem", crit: ["bem"], texto: "As matrículas na educação básica caíram de 48,8 milhões (2016) para 46,0 milhões (2025), acompanhando a queda demográfica da população em idade escolar; o número de escolas também recuou (184,1 mil → 178,8 mil)." },
        { tipo: "at", titulo: "Enem perdeu quase metade dos inscritos", crit: ["bem", "jus"], texto: "Os inscritos no Enem caíram de 8,6 milhões (2016) para 3,5–4,8 milhões (2022–2025), o menor patamar da série — o exame é a principal porta de entrada ao ensino superior público e ao Fies/ProUni." },
      ],
      praticas: [
        "Metas de aprendizagem (alfabetização na idade certa) com apoio técnico às redes, como no Ceará.",
        "Financiamento por aluno com equidade entre redes ricas e pobres, e previsibilidade entre governos.",
        "Carreira docente atrativa, com formação prática e seleção exigente.",
        "Ampliar o ensino técnico integrado ao médio e avaliar programas como o Pé-de-Meia antes de expandi-los.",
      ],
    },

    afirmativas: {
      resumo: "O apoio social federal triplicou em proporção do PIB, com forte efeito redistributivo; o desafio é financiá-lo de forma permanente e garantir portas de saída.",
      cards: [
        { tipo: "pos", titulo: "Transferência de renda ampliada", crit: ["jus", "bem"], texto: "O Bolsa Família (Auxílio Brasil em 2022) passou de 0,44% para 1,35% do PIB (R$ 42,6 bi → R$ 171,8 bi reais), atendendo 18,7 milhões de famílias em 2025. Programas focalizados estão entre os de maior impacto na pobreza por real gasto." },
        { tipo: "pos", titulo: "Permanência estudantil", crit: ["jus"], texto: "A Bolsa Permanência (indígenas, quilombolas e baixa renda) subiu 73% em termos reais (R$ 235 mi → R$ 406 mi) e o PNAES voltou a R$ 1,24 bi após cair a R$ 0,94 bi em 2022." },
        { tipo: "neg", titulo: "Custo crescente sem fonte permanente", crit: ["fis"], texto: "O subtotal pago saltou de 0,46% para 1,37% do PIB. Parte da expansão ocorreu em ano eleitoral por emenda constitucional (2022) e parte fora da LOA (Pé-de-Meia via fundo), o que reduz a transparência." },
        { tipo: "neg", titulo: "Igualdade racial irrisória", crit: ["jus"], texto: "O programa específico pagou R$ 58 mi em 2025 (R$ 8 mi em 2019) e não existiu em 2022 — valor mínimo diante das desigualdades raciais." },
        { tipo: "at", titulo: "Alimentação escolar perdeu valor", crit: ["bem", "jus"], texto: "O repasse do PNAE caiu 23% em termos reais entre 2016 e 2022 (R$ 5,3 bi → R$ 4,1 bi) para cerca de 40 milhões de estudantes; em 2025 voltou a R$ 5,5 bi (orçado)." },
        { tipo: "at", titulo: "Fies encolheu", crit: ["fis", "jus"], texto: "O impacto primário do Fies caiu de R$ 10,9 bi (2016) para R$ 0,8–2,2 bi: alívio fiscal, mas com menor acesso ao ensino superior privado pela via do crédito." },
      ],
      praticas: [
        "Financiar a expansão social dentro do orçamento, com fonte permanente e regra de reajuste.",
        "Cadastro Único atualizado e condicionalidades de saúde e educação.",
        "Portas de saída: qualificação, intermediação de emprego e regra de proteção na transição.",
        "Avaliação de impacto independente e orçamento com marcador de raça e gênero.",
      ],
    },

    corrupcao: {
      resumo: "Os poucos indicadores comparáveis mostram um quadro ambíguo: o índice internacional de percepção não mudou, a preocupação popular caiu bastante, e a apuração de casos despencou entre 2019 e 2022 — sem dado para saber se voltou a subir depois.",
      cards: [
        { tipo: "neg", titulo: "CPI não melhorou", crit: ["jus", "inv"], texto: "O Índice de Percepção de Corrupção (Transparency International) ficou em exatamente 35 pontos tanto em 2019 quanto em 2025 — nenhuma melhora percebida por especialistas internacionais nesses dois pontos medidos." },
        { tipo: "at", titulo: "Preocupação popular caiu mais que a percepção de especialistas", crit: ["jus"], texto: "Enquanto o CPI ficou parado, o percentual de brasileiros que cita corrupção como principal problema caiu de 32% (2016) para 5%–8% (2022–2025) no Datafolha — sinal de que o tema perdeu prioridade no debate público mais do que necessariamente melhorou." },
        { tipo: "neg", titulo: "Apuração despencou entre 2019 e 2022", crit: ["fis", "jus"], texto: "Prisões em operações da PF por corrupção caíram de 421 para 42 (−90%) ainda no governo Bolsonaro; faltam dados para saber se voltou a subir em 2025." },
        { tipo: "at", titulo: "Dados de corrupção são raros e fragmentados", crit: ["fis"], texto: "Ao contrário de quase todo o resto deste site, não há uma única fonte oficial com série anual comparável — cada indicador vem de uma fonte diferente, com metade dos anos sem dado." },
      ],
      praticas: [
        "Publicar séries oficiais contínuas e comparáveis de operações, sanções e recuperação de ativos (hoje fragmentadas entre CGU, PF, TCU e AGU).",
        "Separar claramente percepção (pesquisas de opinião, índices internacionais) de resultado (operações, condenações, valores recuperados) ao avaliar política de combate à corrupção.",
        "Preservar a autonomia investigativa e as regras que sustentaram o pico de operações e prisões entre 2015 e 2019.",
        "Investigar por que a preocupação popular caiu tão mais rápido que os indicadores objetivos, antes de declarar vitória contra a corrupção.",
      ],
    },

    fomento: {
      resumo: "Crédito público e P&D orçamentário se expandiram em 2025, mas o esforço nacional em inovação segue baixo e o crédito subsidiado tem custo fiscal.",
      cards: [
        { tipo: "pos", titulo: "Agricultura familiar", crit: ["jus", "bem"], texto: "O Plano Safra da agricultura familiar quase dobrou em termos reais (R$ 46,5 bi → R$ 89 bi), apoiando produção de alimentos e renda no campo." },
        { tipo: "pos", titulo: "Mais orçamento para C&T", crit: ["inv"], texto: "A função Ciência e Tecnologia empenhou R$ 35 bi em 2025, contra R$ 10–11 bi reais nos anos anteriores." },
        { tipo: "neg", titulo: "P&D nacional estagnado", crit: ["inv", "ext"], texto: "O dispêndio nacional em P&D ficou em ~1,2% do PIB, menos da metade da média da OCDE (~2,7%): baixa capacidade de gerar tecnologia própria." },
        { tipo: "at", titulo: "Crédito direcionado tem custo", crit: ["fis"], texto: "Os benefícios financeiros e creditícios voltaram a 1,35% do PIB em 2025, e o crédito direcionado reduz a potência da política monetária." },
      ],
      praticas: [
        "Crédito direcionado com metas, avaliação e foco em falhas de mercado (inovação, infraestrutura, pequenos produtores).",
        "Estabilidade do fomento à ciência (evitar ciclos de corte e expansão).",
        "Estimular o P&D privado com instrumentos avaliados.",
      ],
    },

    emprego: {
      resumo: "O mercado de trabalho teve o melhor desempenho do período, com geração líquida de ~10 milhões de vínculos formais.",
      cards: [
        { tipo: "pos", titulo: "Desemprego no menor nível", crit: ["bem", "jus"], texto: "A desocupação caiu de 11,9% (2019) para 5,6% (2025), o menor nível da série da PNAD Contínua." },
        { tipo: "pos", titulo: "Mais emprego formal", crit: ["bem", "fis"], texto: "O estoque de empregos com carteira subiu de 38,4 mi para 48,5 mi, ampliando a proteção social e a base de contribuição previdenciária." },
        { tipo: "at", titulo: "Quebra de série", crit: ["bem"], texto: "A troca do Caged pelo Novo Caged em 2020 limita a comparação de fluxos; a informalidade não aparece nesses dados." },
        { tipo: "at", titulo: "Mercado aquecido", crit: ["fis", "inv"], texto: "Desemprego muito baixo com juros de 15% indica pressão inflacionária; sem ganhos de produtividade, o crescimento do emprego tende a desacelerar." },
      ],
      praticas: [
        "Qualificação profissional alinhada à demanda e ensino técnico.",
        "Reduzir a informalidade simplificando obrigações para pequenos negócios.",
        "Políticas de produtividade para sustentar ganhos salariais reais.",
      ],
    },

    externo: {
      resumo: "O setor externo é uma força: superávits crescentes e investimento estrangeiro estável. A fragilidade é a baixa integração e a dependência de commodities.",
      cards: [
        { tipo: "pos", titulo: "Superávit comercial crescente", crit: ["ext"], texto: "Saldo de US$ 68 bi em 2025 (3,0% do PIB), positivo em todos os anos: o país gera as divisas de que precisa." },
        { tipo: "pos", titulo: "Investimento estrangeiro estável", crit: ["inv", "ext"], texto: "O IDP ficou entre US$ 69 bi e US$ 78 bi por ano (3,4%–4,1% do PIB), financiamento de longo prazo e não especulativo." },
        { tipo: "at", titulo: "Exportações seguem preços", crit: ["ext"], texto: "O salto de 2022 (+51% sobre 2019) e a desaceleração depois (+4% até 2025) acompanham os preços de commodities." },
        { tipo: "neg", titulo: "Economia pouco aberta", crit: ["inv"], texto: "A corrente de comércio somou ~28% do PIB em 2025, baixa para uma economia desse porte. Menor integração a cadeias globais limita ganhos de produtividade." },
      ],
      praticas: [
        "Diversificar pauta e destinos, com acordos comerciais (ex.: Mercosul–União Europeia).",
        "Agregar valor às exportações de commodities.",
        "Reduzir barreiras tarifárias e não tarifárias a insumos e bens de capital.",
      ],
    },

    investimento: {
      resumo: "O investimento privado em infraestrutura cresceu com concessões, mas o total segue abaixo do necessário e o investimento federal é residual.",
      cards: [
        { tipo: "pos", titulo: "Capital privado na infraestrutura", crit: ["inv"], texto: "O investimento em infraestrutura chegou a R$ 280 bi em 2025 (2,2% do PIB), dos quais R$ 235 bi privados: concessões e marcos regulatórios atraem capital." },
        { tipo: "neg", titulo: "Abaixo do necessário", crit: ["inv", "bem"], texto: "A infraestrutura recebe ~2% do PIB por ano, abaixo dos ~4% normalmente estimados como necessários para modernizar logística, energia e saneamento." },
        { tipo: "neg", titulo: "Investimento federal residual", crit: ["inv"], texto: "O investimento federal em infraestrutura caiu de 0,25% para 0,16% do PIB; em ferrovias, a despesa empenhada foi praticamente zero em 2025 (R$ 60 mi)." },
        { tipo: "at", titulo: "Matriz rodoviária", crit: ["inv", "ext"], texto: "Rodovias concentram o gasto federal de transporte (R$ 12,7 bi empenhados em 2025): frete mais caro reduz a competitividade das exportações." },
      ],
      praticas: [
        "Segurança jurídica e estabilidade regulatória para concessões e PPPs.",
        "Carteira federal priorizada e com projetos maduros (estruturação e licenciamento).",
        "Diversificar a matriz logística com ferrovias e cabotagem.",
      ],
    },
  };
})();
