/* Duas leituras dos mesmos dados, por página.
 *
 * lib = visão liberal (pró-mercado; chamada de "neoliberal" por seus críticos)
 * dev = visão desenvolvimentista (social-desenvolvimentista, ênfase em justiça social)
 *
 * Cada visão: leitura (como interpreta os dados), destaques (números que enfatiza),
 * propostas (o que defenderia). consenso/divergencia: onde se encontram e onde se separam.
 * Os textos apresentam cada visão com seus melhores argumentos; não representam partidos.
 */
(function () {
  window.VISOES = {
    lib: { nome: "Visão liberal", sub: "pró-mercado · chamada de \"neoliberal\" por seus críticos", icone: "L" },
    dev: { nome: "Visão desenvolvimentista", sub: "social-desenvolvimentista · ênfase em justiça social", icone: "D" },
  };

  window.LEITURAS = {
    visao: {
      lib: {
        leitura: "O período confirma que crescimento depende de confiança fiscal. Com a dívida em alta e a Selic em 15%, o investimento privado trava. A melhora do emprego é real, mas apoiada em gasto público que não cabe no orçamento.",
        destaques: ["Dívida bruta de 69,8% para 78,6% do PIB", "Juros de R$ 1,0 tri (7,9% do PIB) em 2025", "Resultado primário negativo em 3 de 4 anos", "Investimento (FBCF) de apenas 16,8% do PIB"],
        propostas: ["Ajuste fiscal pelo lado da despesa", "Reformas estruturais (administrativa, abertura comercial)", "Regras estáveis e Banco Central autônomo para atrair capital privado"],
      },
      dev: {
        leitura: "O período mostra que o Estado ativo funciona: com mais gasto social, crédito público e investimento, o desemprego caiu à metade e a renda dos mais pobres subiu. O problema fiscal é, antes de tudo, o custo dos juros.",
        destaques: ["Desemprego de 11,5% para 5,6%", "Transferência de renda de 0,44% para 1,35% do PIB", "Juros equivalem a 2,5 vezes saúde e educação federais", "Anos de austeridade (2016–2019): PIB real +5,8% em três anos"],
        propostas: ["Reduzir os juros e rever a condução da política monetária", "Tributar altas rendas e revisar renúncias fiscais", "Investimento público como motor do crescimento"],
      },
      consenso: "Investimento baixo e juros muito altos são problemas; a qualidade do gasto público precisa melhorar.",
      divergencia: "A causa dos juros altos (desequilíbrio fiscal × política monetária e estrutura da dívida) e o tamanho ideal do Estado.",
    },

    economia: {
      lib: {
        leitura: "Os ganhos vieram de setores competitivos e expostos ao mercado, como o agro. A indústria perde fôlego por causa do custo Brasil (tributos, logística, burocracia), não por falta de política industrial.",
        destaques: ["Agropecuária de 4,9% para 6,1% do PIB", "Transformação em 11,8% do PIB mesmo após décadas de incentivos", "Extrativa atrai capital privado quando há regras claras"],
        propostas: ["Reduzir o custo Brasil", "Abertura para integrar cadeias globais de valor", "Deixar o mercado alocar o capital, sem escolher setores vencedores"],
      },
      dev: {
        leitura: "A economia está se reprimarizando: depende de soja, petróleo e minério, sujeitos ao preço externo. Sem política industrial, o país não gera empregos de qualidade nem tecnologia própria.",
        destaques: ["Extrativa oscila de 0,9% a 4,7% do PIB com o preço do petróleo", "Construção −5% em termos reais", "Setor financeiro em 7,3% do PIB com Selic de 15%"],
        propostas: ["Política industrial com metas (neoindustrialização)", "Compras públicas e conteúdo local para cadeias estratégicas", "Crédito público direcionado a setores de maior valor agregado"],
      },
      consenso: "A produtividade é baixa e é preciso agregar valor às cadeias de commodities.",
      divergencia: "Quem escolhe os setores a desenvolver: o mercado ou o Estado.",
    },

    receitas: {
      lib: {
        leitura: "A carga tributária já é alta para um país de renda média, e a arrecadação federal cresceu mais que o PIB. Aumentar impostos reduz o investimento; o caminho é simplificar e cortar privilégios setoriais.",
        destaques: ["Arrecadação federal de 20,6% para 22,7% do PIB", "Superávit de 2022 dependeu de receitas extraordinárias", "Complexidade e cumulatividade do sistema"],
        propostas: ["Não elevar a carga total", "Reforma do consumo (IVA) e simplificação", "Cortar renúncias setoriais junto com redução de alíquotas"],
      },
      dev: {
        leitura: "O problema não é o tamanho da carga, e sim quem paga: o consumo é muito tributado, enquanto renda e patrimônio pagam pouco. As renúncias beneficiam empresas e rendas altas.",
        destaques: ["Gastos tributários de R$ 587 bi (4,6% do PIB), acima de saúde e educação federais", "IR em 6,8% do PIB, ainda baixo", "Dividendos e royalties sustentam parte da receita"],
        propostas: ["Tributar lucros e dividendos e altas rendas", "Revisar renúncias fiscais", "Tornar o sistema progressivo, aliviando o consumo dos mais pobres"],
      },
      consenso: "Rever gastos tributários e simplificar o sistema (a reforma do consumo teve apoio amplo).",
      divergencia: "Se a carga total deve subir, e quanto tributar renda e patrimônio.",
    },

    despesas: {
      lib: {
        leitura: "A despesa obrigatória cresce no piloto automático (previdência, BPC, vinculações) e esmaga o resto. O teto de gastos baixou a despesa de 19,9% para 18,0% do PIB e ajudou a chegar ao superávit de 2022.",
        destaques: ["Despesa primária volta a 18,8% do PIB em 2025", "Discricionárias em apenas 1,6% do PIB", "Precatórios dobraram em % do PIB"],
        propostas: ["Desvincular e desindexar benefícios do salário mínimo", "Reforma administrativa", "Regra de despesa rígida e crível"],
      },
      dev: {
        leitura: "O teto comprimiu investimentos e serviços públicos. A despesa primária é estável em proporção do PIB; o que explode são os juros. Cortar o social para pagar juros inverte prioridades.",
        destaques: ["Discricionárias caíram a 1,5% do PIB em 2022", "Juros do Governo Central de 7,0% do PIB em 2025", "Complementação ao Fundeb mais que dobrou"],
        propostas: ["Tirar o investimento da regra fiscal", "Proteger os pisos de saúde e educação", "Manter a valorização do salário mínimo"],
      },
      consenso: "A rigidez orçamentária limita escolhas; as políticas precisam de avaliação.",
      divergencia: "Vinculações constitucionais e indexação dos benefícios ao salário mínimo.",
    },

    divida: {
      lib: {
        leitura: "A trajetória da dívida é o principal risco do país: 78,6% do PIB na bruta, com a líquida subindo sem parar. Sem primário positivo, o mercado exige juros maiores — o juro alto é consequência do fiscal.",
        destaques: ["Dívida líquida de 46,1% para 65,2% do PIB", "Rolagem de R$ 1,4 tri por ano", "Primário do setor público negativo em 2025"],
        propostas: ["Superávit primário para estabilizar a dívida", "Âncora fiscal crível e duradoura", "Privatizações para abater dívida"],
      },
      dev: {
        leitura: "A dívida é interna e em reais (96%): não há risco de calote externo. O que a faz crescer é a Selic. Os juros de R$ 1 tri em 2025 são muito maiores que o déficit primário de R$ 62 bi.",
        destaques: ["Juros de 7,9% do PIB × primário de −0,5%", "Com Selic baixa (2019), os juros caíram a 5,0% do PIB", "Juros transferem renda a detentores de títulos"],
        propostas: ["Selic menor e coordenação entre o BC e a política fiscal", "Reduzir a parcela da dívida atrelada à Selic", "Crescer para diluir a dívida"],
      },
      consenso: "Dívida em moeda local é uma vantagem; é preciso alongar prazos.",
      divergencia: "A direção da causalidade: fiscal → juros ou juros → fiscal.",
    },

    orcamento: {
      lib: {
        leitura: "Executar 90% do orçamento só mostra que quase tudo é obrigatório. O investimento baixo é sintoma de ineficiência do Estado; concessões ao setor privado entregam mais.",
        destaques: ["Investimento pago de 0,19% a 0,30% do PIB", "Só 37% a 47% da dotação de investimento é paga no ano", "Obras empurradas em restos a pagar"],
        propostas: ["Concessões e PPPs", "Orçamento base zero e revisão de programas", "Reduzir a fragmentação do orçamento"],
      },
      dev: {
        leitura: "O investimento público é a primeira vítima das metas fiscais: é contingenciado para fechar as contas. Investimento público puxa o privado, sobretudo onde o retorno é social.",
        destaques: ["2025: R$ 37,8 bi pagos, maior valor real do período", "2022: mínimo da série", "Contingenciamento concentra-se no investimento"],
        propostas: ["Piso para investimento público", "Programa plurianual de obras (Novo PAC)", "Papel ativo de estatais e bancos públicos"],
      },
      consenso: "Planejamento plurianual e projetos bem estruturados.",
      divergencia: "Quem deve liderar o investimento em infraestrutura: o Estado ou o setor privado.",
    },

    federativo: {
      lib: {
        leitura: "Estados e municípios já recebem uma fatia crescente e garantida da receita federal (FPE/FPM cresceram bem acima do PIB) — o problema não é falta de repasse, é a gestão local desses recursos, muitas vezes sem contrapartida de eficiência.",
        destaques: ["FPE+FPM de 2,39% para 2,84% do PIB", "SUS fundo a fundo +65% real", "Sem exigência de resultado atrelada aos repasses"],
        propostas: ["Condicionar parte dos repasses a indicadores de resultado (educação, saúde)", "Transparência e accountability municipal", "Evitar que repasses federais substituam esforço fiscal próprio dos entes"],
      },
      dev: {
        leitura: "O pacto federativo segue desigual: FPE/FPM ajudam, mas municípios pequenos e pobres dependem demais deles, e áreas como assistência social nem têm dado consolidado — sinal de que a União trata regiões pobres como segunda prioridade.",
        destaques: ["Glosas cortam bilhões do repasse ao SUS todo ano", "FNAS/SUAS sem série pública", "PNAE perdeu valor real até 2022"],
        propostas: ["Ampliar e estabilizar o Fundeb e o SUS fundo a fundo", "Publicar e fortalecer os repasses de assistência social", "Fundos de equalização para reduzir desigualdade entre municípios"],
      },
      consenso: "É preciso mais transparência: nem o total das transferências, nem as de assistência social, têm série pública clara.",
      divergencia: "Repasse condicionado a resultado × repasse garantido como direito constitucional.",
    },

    social: {
      lib: {
        leitura: "O Brasil gasta muito com o social; o problema é eficiência. A previdência consome recursos de país rico e envelhecido, e mais dinheiro sem gestão não melhora resultados.",
        destaques: ["Previdência da União em 8,8% do PIB", "Previdência = 2,8 vezes saúde e educação", "Resultados educacionais estagnados"],
        propostas: ["Nova etapa de reforma previdenciária", "Gestão por resultados e metas", "Parcerias com o setor privado e terceiro setor na prestação de serviços"],
      },
      dev: {
        leitura: "Saúde e educação ficaram estagnadas sob o teto (educação no mínimo em 2022) e só voltaram a crescer em 2025. SUS e escola pública são os maiores instrumentos de redução de desigualdade.",
        destaques: ["Saúde +51% real entre 2016 e 2025", "Educação caiu a 1,09% do PIB em 2022", "Segurança parada em 0,12% do PIB"],
        propostas: ["Pisos constitucionais preservados", "Financiamento estável do SUS", "Valorização dos profissionais de saúde e educação"],
      },
      consenso: "Os resultados (aprendizagem, saúde) precisam ser medidos e publicados.",
      divergencia: "Nova reforma previdenciária × ampliação do financiamento dos serviços.",
    },

    seguranca_pub: {
      lib: {
        leitura: "A queda da violência letal coincide com posturas mais duras: leis mais rígidas, armamento e apoio à ação policial. Onde a polícia age com mais liberdade, o crime organizado recua.",
        destaques: ["MVI caiu em todos os 4 anos (30,2 → 19,1 por 100 mil)", "Roubos caíram 66% (taxa)", "Latrocínio caiu 70%"],
        propostas: ["Endurecimento penal para crimes graves e reincidência", "Mais autonomia e respaldo jurídico para a ação policial", "Inteligência e ostensividade contra o crime organizado"],
      },
      dev: {
        leitura: "A queda geral esconde um dado grave: letalidade policial e feminicídio sobem justamente onde faltam políticas específicas (proteção à mulher, controle do uso da força), não repressão genérica.",
        destaques: ["Letalidade policial (MDIP) +56%", "Feminicídio mais que dobrou (+153%)", "Efetivo policial nem é medido nacionalmente"],
        propostas: ["Políticas específicas de proteção à mulher (Lei Maria da Penha, casas-abrigo)", "Protocolos e controle do uso da força policial", "Investimento em prevenção social, não só repressão"],
      },
      consenso: "A queda de homicídio doloso e roubo é real e deve ser sustentada; faltam dados básicos (efetivo policial) para avaliar políticas com rigor.",
      divergencia: "O que explica a queda: repressão mais dura × outros fatores (demografia, mercado de trabalho, políticas locais) — e o que fazer com a letalidade policial em alta.",
    },

    educacao: {
      lib: {
        leitura: "O Brasil já gasta em educação uma fatia do PIB (~5,5%, todas as esferas) parecida com a dos países ricos e colhe resultados muito piores. O problema é gestão, não falta de dinheiro, e o ensino superior recebe uma parte desproporcional.",
        destaques: ["PISA 2022: Brasil com 379 pontos em matemática, OCDE com 472", "Educação federal +39% reais em 2025, ainda sem evidência de ganho de aprendizagem", "Fies custou R$ 10,9 bi em 2016 com alta inadimplência"],
        propostas: ["Gestão por resultados, com metas e avaliação de escolas e redes", "Prioridade à educação básica e à primeira infância", "Cobrança no ensino superior público para quem pode pagar"],
      },
      dev: {
        leitura: "A educação foi estrangulada pelo teto de gastos: a função Educação perdeu 15% reais entre 2016 e 2022. A recomposição e o Fundeb ampliado corrigem desigualdades, mas o gasto por aluno ainda é uma fração do de países ricos.",
        destaques: ["Função Educação −15% reais (2016–2022) e +39% (2022–2025)", "Fundeb de 0,22% para 0,47% do PIB", "Bolsa Permanência +168% entre 2022 e 2025"],
        propostas: ["Cumprir a meta do PNE de investir 10% do PIB em educação", "Valorização salarial e formação dos professores", "Universidade pública gratuita com assistência estudantil e expansão dos institutos federais"],
      },
      consenso: "Aprendizagem é a prioridade: alfabetização na idade certa, ensino técnico e o modelo do Ceará são defendidos pelos dois lados.",
      divergencia: "Mais recursos × melhor gestão dos recursos existentes, e a cobrança de mensalidade no ensino superior público.",
    },

    afirmativas: {
      lib: {
        leitura: "Transferências focalizadas como o Bolsa Família são bem avaliadas até por liberais: baixo custo por impacto. O risco é a expansão rápida sem fonte permanente, parte fora do orçamento e sem portas de saída.",
        destaques: ["De 0,44% para 1,35% do PIB em poucos anos", "Expansão por emenda em ano eleitoral (2022)", "Pé-de-Meia pago por fundo fora da LOA"],
        propostas: ["Focalização via Cadastro Único", "Regras de saída e incentivo ao trabalho", "Unificar programas e avaliar impacto"],
      },
      dev: {
        leitura: "O salto das transferências e da assistência estudantil é reparação social: 18,7 milhões de famílias atendidas e mais estudantes indígenas, quilombolas e de baixa renda na universidade. Falta escala para a igualdade racial.",
        destaques: ["Bolsa Permanência +73% real", "Igualdade racial: R$ 58 mi, sem programa em 2022", "PNAE perdeu 23% real até 2022"],
        propostas: ["Tornar as políticas permanentes e ampliá-las", "Orçamento próprio para igualdade racial", "Cotas com políticas de permanência"],
      },
      consenso: "O Bolsa Família é eficiente e deve ser avaliado continuamente.",
      divergencia: "Escala e universalização × focalização estrita e custo fiscal.",
    },

    corrupcao: {
      lib: {
        leitura: "A queda nas prisões e operações revela a politização do combate à corrupção no ciclo anterior (Lava Jato como instrumento seletivo) mais do que um recuo real na fiscalização — o problema de fundo é a insegurança jurídica que espantou investimento, não a falta de prisões.",
        destaques: ["Prisões por corrupção caíram 90% (2019→2022)", "CPI estagnado em 35 pontos nos dois extremos medidos", "Preocupação popular caiu de 32% para 5%–8%"],
        propostas: ["Segurança jurídica e previsibilidade para investimento, não operações midiáticas recorrentes", "Fortalecer controles preventivos (compliance, transparência) em vez de repressão pontual", "Evitar uso político de investigações e de prisões preventivas prolongadas"],
      },
      dev: {
        leitura: "A queda abrupta nas prisões e operações após 2019 é sinal de enfraquecimento dos mecanismos de controle (mudanças nas regras de prisão, interferências na PF) — não de menos corrupção, já que o índice internacional de percepção não melhorou.",
        destaques: ["CPI parado em 35: nenhuma melhora percebida por especialistas", "Operações da CGU: pico de 96 em 2020, historicamente baixas depois (37 em 2023)", "Cofres públicos perdem com menos recuperação de ativos"],
        propostas: ["Reforçar a autonomia da Polícia Federal e da CGU", "Recompor regras de prisão que sustentaram o pico de resultados de 2015 a 2019", "Ampliar transparência sobre sanções (CEIS/CNEP) e recuperação de ativos"],
      },
      consenso: "O CPI parado em 35 pontos mostra que nenhum dos períodos resolveu o problema percebido pelos especialistas internacionais.",
      divergencia: "Se a queda em prisões e operações é correção de excessos do ciclo anterior ou enfraquecimento do combate à corrupção.",
    },

    fomento: {
      lib: {
        leitura: "Crédito subsidiado distorce a alocação de capital, custa ao Tesouro e reduz a eficácia dos juros: a \"meia-entrada\" faz a Selic ser mais alta para todos os demais.",
        destaques: ["Benefícios financeiros e creditícios de 1,35% do PIB", "Plano Safra de 4,75% do PIB", "P&D nacional parado apesar do crédito"],
        propostas: ["Crédito a taxa de mercado (TLP)", "Desenvolver o mercado de capitais", "Encerrar subsídios setoriais sem avaliação"],
      },
      dev: {
        leitura: "Bancos públicos financiam o que o mercado não financia: longo prazo, agricultura familiar e inovação. Quando o BNDES encolheu após 2016, o investimento caiu junto.",
        destaques: ["BNDES de R$ 137 bi para R$ 77 bi reais (2016→2019)", "Agricultura familiar quase dobrou", "Ciência e Tecnologia: R$ 35 bi em 2025"],
        propostas: ["BNDES como banco de desenvolvimento e de missões (transição ecológica)", "Fundos estáveis para ciência (FNDCT)", "Crédito rural para pequenos produtores"],
      },
      consenso: "O P&D é baixo e precisa crescer.",
      divergencia: "O papel e o tamanho dos bancos públicos.",
    },

    emprego: {
      lib: {
        leitura: "Para esta leitura, a reforma trabalhista de 2017 e a modernização das relações de trabalho abriram caminho para a formalização recorde. O desemprego tão baixo com Selic de 15% sinaliza economia acima do potencial.",
        destaques: ["+10 milhões de empregos formais", "Desemprego de 5,6%", "Pressão inflacionária do mercado aquecido"],
        propostas: ["Flexibilizar e simplificar contratações", "Desonerar a folha de pagamentos", "Qualificação voltada à produtividade"],
      },
      dev: {
        leitura: "O emprego recorde veio com valorização do salário mínimo, transferências e crédito, que aqueceram a demanda. Nos anos de austeridade, o desemprego ficou acima de 11%.",
        destaques: ["Desemprego de 11,9% (2019) para 5,6% (2025)", "Saldo de −1,3 milhão de vagas em 2016", "Estoque formal de 48,5 milhões"],
        propostas: ["Política de valorização salarial", "Combater a informalidade e a \"pejotização\"", "Fortalecer direitos e negociação coletiva"],
      },
      consenso: "Formalização e qualificação profissional são prioridades.",
      divergencia: "Flexibilizar regras × ampliar proteção ao trabalhador.",
    },

    externo: {
      lib: {
        leitura: "Superávit e investimento estrangeiro estável mostram que o Brasil atrai capital quando há regras claras. O problema é a baixa abertura: mais comércio traz mais produtividade.",
        destaques: ["Corrente de comércio de ~28% do PIB", "IDP entre US$ 69 bi e US$ 78 bi", "Superávit de US$ 68 bi"],
        propostas: ["Reduzir tarifas de importação", "Acordos comerciais (Mercosul–UE) e adesão à OCDE", "Câmbio flutuante e livre fluxo de capitais"],
      },
      dev: {
        leitura: "O superávit vem de commodities: o país exporta matéria-prima e importa tecnologia. Abrir sem política industrial aprofunda a desindustrialização e a dependência externa.",
        destaques: ["Salto de 2022 coincidiu com preços de commodities", "Exportações cresceram só 4% de 2022 a 2025", "Dependência de preço externo"],
        propostas: ["Política industrial voltada à exportação de maior valor", "Integração regional sul-americana", "Gestão de fluxos de capital especulativo"],
      },
      consenso: "É preciso diversificar a pauta exportadora.",
      divergencia: "Ritmo e condições da abertura comercial.",
    },

    investimento: {
      lib: {
        leitura: "O capital privado já responde por R$ 235 bi dos R$ 280 bi investidos em infraestrutura: o caminho é concessão, privatização e segurança jurídica, não obra pública.",
        destaques: ["84% do investimento em infraestrutura é privado", "Investimento federal de apenas 0,16% do PIB", "Recorde de investimento privado em 2025"],
        propostas: ["Ampliar concessões e privatizações", "Agências reguladoras independentes", "Segurança jurídica e estabilidade contratual"],
      },
      dev: {
        leitura: "O setor privado investe onde o retorno é garantido. Ferrovias federais praticamente zeradas e saneamento em regiões pobres mostram o limite: sem o Estado, a infraestrutura não chega a todos.",
        destaques: ["Investimento federal em infraestrutura de 0,25% para 0,16% do PIB", "Ferrovias: R$ 60 mi empenhados em 2025", "Total ainda ~2% do PIB, abaixo do necessário"],
        propostas: ["Investimento público coordenado (Novo PAC)", "Estatais estratégicas em setores de rede", "Planejamento territorial para reduzir desigualdades regionais"],
      },
      consenso: "Projetos bem estruturados e segurança jurídica atraem investimento.",
      divergencia: "Privatização × presença estatal em infraestrutura.",
    },
  };
})();
