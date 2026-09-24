/* Narrativas × dados: checagem de narrativas frequentes no debate público
 * (bolsonaristas e petistas) e espelho nos países de referência
 * (Noruega, Suécia, Dinamarca, Finlândia, Coreia do Sul e Alemanha).
 *
 * v (veredito): "sim" = procede | "parte" = procede em parte | "nao" = não procede
 * Checam-se narrativas, não pessoas. Não há cota de acertos por lado: o veredito sai
 * do dado da planilha e da comparação com os países de referência.
 * Números do Brasil: planilha (R$ reais de dez/2025 ou % do PIB).
 * Números internacionais: aproximados, fontes oficiais nacionais e OCDE, anos recentes (~2022–2024).
 */
(function () {
  window.LADOS = {
    bol: { nome: "Bolsonaristas", sub: "narrativas frequentes no debate público" },
    pt: { nome: "Petistas", sub: "narrativas frequentes no debate público" },
  };

  window.CHECAGEM = {
    visao: {
      bol: [
        { v: "parte", frase: "A economia cresceu e as contas melhoraram no governo Bolsonaro.", dado: "O PIB real cresceu 12,1% de 2019 a 2022 e houve superávit primário em 2022 (R$ 46 bi). Mas o superávit veio de receitas extraordinárias (dividendos e royalties: 2,2% do PIB), não de ajuste estrutural." },
        { v: "nao", frase: "O governo Lula quebrou o país.", dado: "De 2022 a 2025 o PIB real cresceu 10,5%, o desemprego caiu ao menor nível da série (5,6%) e o superávit comercial bateu recorde. O risco fiscal é real (dívida +7 p.p. do PIB), mas \"quebrado\" não corresponde aos dados." },
      ],
      pt: [
        { v: "sim", frase: "O governo Lula entregou crescimento e o menor desemprego da história.", dado: "Desemprego de 5,6% em 2025, o menor da série da PNAD Contínua, e +5,8 milhões de empregos formais entre 2022 e 2025." },
        { v: "parte", frase: "As contas estão sob controle; o problema é só o juro do Banco Central.", dado: "Os juros (7,9% do PIB) são o maior peso, mas o primário também é negativo (−R$ 62 bi em 2025) e a despesa primária cresceu 16% reais em três anos. A dívida bruta subiu de 71,7% para 78,6% do PIB." },
      ],
      espelho: [
        { pais: "Nórdicos", txt: "Estado de bem-estar amplo, financiado por carga de 40%–47% do PIB, com contas equilibradas por regras fiscais rígidas." },
        { pais: "Todos", txt: "Juros da dívida abaixo de ~1,5% do PIB (Brasil: 7,9%) e desigualdade baixa (Gini ~0,25–0,33; Brasil ~0,52)." },
        { pais: "Coreia do Sul", txt: "Crescimento puxado por investimento, educação e P&D (~5% do PIB), com carga menor (~32% do PIB)." },
      ],
      licao: "Nos países de referência, justiça social e responsabilidade fiscal andam juntas. No Brasil, cada lado costuma defender só uma das duas.",
    },

    economia: {
      bol: [
        { v: "parte", frase: "O agro sustenta o Brasil.", dado: "O agro responde por 6,1% do PIB diretamente (mais com a cadeia de insumos, indústria e serviços ligados a ele) e é decisivo para as exportações. Mas serviços são ~60% e indústria ~20% do PIB." },
        { v: "parte", frase: "A indústria foi retomada entre 2019 e 2022.", dado: "A transformação subiu de 10,3% para 13,1% do PIB, mas boa parte veio da alta de preços industriais e de commodities em 2021–22, e o ganho não se manteve." },
      ],
      pt: [
        { v: "nao", frase: "A neoindustrialização já está reindustrializando o país.", dado: "A transformação caiu de 13,1% para 11,8% do PIB de 2022 a 2025 e ficou estável em termos reais (R$ 1,51 tri → R$ 1,50 tri). Ainda não há reindustrialização nos dados." },
        { v: "parte", frase: "O setor financeiro lucra com juros enquanto a produção sofre.", dado: "As atividades financeiras saltaram de 6,0% para 7,3% do PIB entre 2022 e 2025, com Selic de 15%, e a construção encolheu. Mas a produção não caiu como um todo: o agro cresceu 17% reais e a transformação ficou estável." },
      ],
      espelho: [
        { pais: "Coreia do Sul", txt: "Indústria de transformação ~25% do PIB: política industrial com metas de exportação e cobrança de desempenho." },
        { pais: "Alemanha", txt: "Indústria ~18% do PIB, baseada em empresas médias exportadoras, ensino técnico dual e bancos de desenvolvimento (KfW)." },
        { pais: "Finlândia / Suécia", txt: "Economias abertas especializadas em alta tecnologia (telecom, máquinas, florestal de alto valor)." },
      ],
      licao: "Política industrial funciona com metas, avaliação e exposição à concorrência: nem proteção indefinida, nem ausência de estratégia.",
    },

    receitas: {
      bol: [
        { v: "parte", frase: "O brasileiro paga imposto de país rico.", dado: "A carga total (~32%–33% do PIB) está perto da média da OCDE (~34%) e abaixo dos nórdicos (40%–47%). O problema real é o retorno em serviços e a regressividade, não o tamanho da carga." },
        { v: "sim", frase: "O governo Lula aumentou a carga de impostos.", dado: "A arrecadação federal subiu de 22,0% para 22,7% do PIB entre 2022 e 2025, com a volta de tributos sobre combustíveis e novas tributações (fundos exclusivos, offshores, apostas). Ressalva: a alta também ocorreu de 2019 a 2022 (20,8% → 22,0%)." },
        { v: "parte", frase: "O governo Bolsonaro reduziu impostos.", dado: "Houve cortes (IPI, combustíveis em 2022), mas a arrecadação federal subiu de 20,8% para 22,0% do PIB entre 2019 e 2022, com inflação e commodities." },
      ],
      pt: [
        { v: "sim", frase: "Os ricos pagam pouco imposto no Brasil.", dado: "Até 2025 os dividendos eram isentos, e os gastos tributários somam 4,6% do PIB (R$ 587 bi), mais que saúde e educação federais. Todos os países de referência tributam dividendos." },
        { v: "nao", frase: "A arrecadação recorde prova que não há problema fiscal.", dado: "O recorde é nominal. A receita líquida está estável (~18,3% do PIB desde 2019), enquanto a despesa primária subiu de 18,0% para 18,8% do PIB." },
      ],
      espelho: [
        { pais: "Nórdicos", txt: "Carga alta, mas de base ampla: IVA de ~25% sem exceções e imposto de renda progressivo que inclui dividendos e ganhos de capital." },
        { pais: "Todos", txt: "Poucas renúncias setoriais; imposto sobre lucro das empresas moderado (~20%–30%)." },
        { pais: "Noruega", txt: "Receita do petróleo vai para um fundo soberano; o orçamento só usa o retorno esperado (~3% ao ano)." },
      ],
      licao: "Carga alta só é aceita quando o sistema é simples, tem base ampla e devolve serviços de qualidade. Isenções devem ser exceção, com prazo e avaliação.",
    },

    despesas: {
      bol: [
        { v: "nao", frase: "O problema é o Estado inchado, que gasta demais com servidores.", dado: "Na União, o gasto com pessoal caiu de 4,1% para 3,2% do PIB (2016–2025). O que cresce são previdência, benefícios e precatórios." },
        { v: "sim", frase: "O gasto do governo Lula disparou.", dado: "A despesa primária cresceu 16% reais de 2022 a 2025 (R$ 2,07 tri → R$ 2,39 tri), de 18,0% para 18,8% do PIB. Ressalva: o nível ainda é menor que o de 2016 (19,9%)." },
        { v: "parte", frase: "O teto de gastos funcionou.", dado: "A despesa caiu de 19,9% para 18,0% do PIB (2016–2022), mas espremeu o investimento (discricionárias em 1,5%) e foi furado por emendas constitucionais em 2021–22. Nos países de referência, a regra de despesa convive com investimento protegido." },
      ],
      pt: [
        { v: "parte", frase: "O arcabouço fiscal garante a responsabilidade.", dado: "A despesa primária subiu 16% reais (18,0% → 18,8% do PIB) e o resultado de 2025 foi −R$ 62 bi. A meta só foi cumprida porque R$ 48,7 bi em despesas autorizadas foram descontados da conta (déficit considerado para a meta: ~R$ 13 bi)." },
        { v: "parte", frase: "Gasto social não é gasto, é investimento.", dado: "Vale para educação, primeira infância e transferências focalizadas. Mas o maior gasto social, a previdência (8,8% do PIB), é essencialmente consumo, não investimento. A composição importa." },
      ],
      espelho: [
        { pais: "Suécia", txt: "Teto de despesa para três anos e meta de resultado ao longo do ciclo econômico, respeitados por governos de esquerda e de direita." },
        { pais: "Alemanha", txt: "Freio da dívida (déficit estrutural máximo de 0,35% do PIB), flexibilizado em 2025 só para infraestrutura e defesa." },
        { pais: "Dinamarca / Finlândia", txt: "Gasto público alto (~45%–50% do PIB), com revisão sistemática de programas." },
      ],
      licao: "Gastar muito não é o problema; gastar sem regra crível e sem avaliação é. Os nórdicos combinam Estado grande com regra fiscal rígida e respeitada.",
    },

    divida: {
      bol: [
        { v: "sim", frase: "A dívida disparou no governo Lula.", dado: "Entre 2022 e 2025, a dívida bruta subiu de 71,7% para 78,6% do PIB e a líquida de 56,1% para 65,2%, a maior alta entre os três períodos. Ressalva: a dívida líquida também subiu nos governos anteriores." },
        { v: "parte", frase: "Bolsonaro reduziu a dívida.", dado: "A dívida bruta caiu de 74,4% para 71,7% do PIB entre 2019 e 2022, ajudada pela inflação alta, que infla o PIB nominal. A dívida líquida subiu (54,7% → 56,1%)." },
        { v: "parte", frase: "Os juros altos são culpa só do governo gastador.", dado: "O risco fiscal eleva o prêmio, mas os juros também seguem o ciclo da inflação: foram 5,0% do PIB com Selic de 4,5% (2019) e subiram com Selic de 13,75% ainda em 2022." },
      ],
      pt: [
        { v: "parte", frase: "Os juros do Banco Central são a causa da dívida.", dado: "Os juros (7,9% do PIB) explicam a maior parte do déficit nominal; o primário foi de −0,5%. Mas a Selic reage a inflação e expectativas, que dependem da credibilidade fiscal." },
        { v: "nao", frase: "Dívida em reais não é problema.", dado: "Ser interna reduz o risco externo, mas custa R$ 1 tri por ano e exige rolar R$ 1,4 tri. Alemanha e Finlândia têm dívida parecida em % do PIB e pagam menos de 1,5% do PIB em juros." },
      ],
      espelho: [
        { pais: "Alemanha / Finlândia", txt: "Dívida de ~60%–80% do PIB, mas juros baixos pela credibilidade." },
        { pais: "Suécia / Dinamarca", txt: "Dívida de ~30% do PIB após décadas de superávits, construídos depois das crises dos anos 1990." },
        { pais: "Noruega", txt: "Fundo soberano com ativos acima de 3 vezes o PIB: governo credor líquido." },
      ],
      licao: "O problema brasileiro é menos o nível da dívida e mais o custo: juros reais altíssimos. Reduzi-los exige credibilidade fiscal e coordenação com a política monetária.",
    },

    orcamento: {
      bol: [
        { v: "sim", frase: "O Estado brasileiro gasta muito e investe pouco.", dado: "Quase todo o orçamento é despesa obrigatória, e o investimento pago pela União oscilou entre 0,19% e 0,30% do PIB. Ressalva: o mínimo do período (R$ 22,4 bi reais) foi em 2022." },
        { v: "nao", frase: "O governo Bolsonaro fez muitas obras com pouco dinheiro.", dado: "O investimento pago em 2022 foi o menor do período: R$ 22,4 bi reais (0,19% do PIB), contra ~4%–5% do PIB de investimento público nos países de referência." },
        { v: "parte", frase: "O Estado executa mal o orçamento por ineficiência e corrupção.", dado: "O orçamento total é executado em 87%–91%. A baixa execução está no investimento (37%–47%), cortado para cumprir metas: é escolha de política, não só ineficiência." },
      ],
      pt: [
        { v: "sim", frase: "O Novo PAC retomou o investimento público.", dado: "O investimento pago em 2025 foi de R$ 37,8 bi, o maior valor real do período (+69% sobre 2022). Ressalva: ainda é só 0,3% do PIB." },
        { v: "nao", frase: "Os cortes são impostos pelo mercado financeiro.", dado: "As metas fiscais são definidas pelo governo e pelo Congresso: o arcabouço (LC 200/2023) foi proposto pelo próprio governo." },
      ],
      espelho: [
        { pais: "Nórdicos / Coreia", txt: "Investimento público de ~4%–5% do PIB, somando todas as esferas." },
        { pais: "Coreia do Sul", txt: "Obras grandes passam por estudo de viabilidade obrigatório feito por instituto independente (KDI) antes de entrar no orçamento." },
        { pais: "Alemanha", txt: "Fundo de infraestrutura plurianual criado em 2025, fora do freio da dívida." },
      ],
      licao: "Investimento precisa de carteira plurianual, avaliação independente e proteção contra cortes de curto prazo.",
    },

    federativo: {
      bol: [
        { v: "sim", frase: "O FPE e o FPM cresceram muito nos últimos anos.", dado: "FPE + FPM somaram R$ 362 bi reais em 2025 (2,84% do PIB), ante R$ 232 bi (2,39% do PIB) em 2016 — alta real de 56%, beneficiando todos os estados e municípios, governados por qualquer partido." },
      ],
      pt: [
        { v: "sim", frase: "O governo Lula fortaleceu o Fundeb e o SUS fundo a fundo.", dado: "A complementação ao Fundeb foi de R$ 32,9 bi (2022) para R$ 59,7 bi reais (2025, +82%) e o repasse líquido do SUS de R$ 111,2 bi para R$ 164,7 bi (+48%)." },
        { v: "nao", frase: "O pacto federativo brasileiro é transparente e bem monitorado.", dado: "Não foi possível localizar uma série consolidada do total de transferências da União a estados e municípios, nem os repasses do FNAS/SUAS — nenhuma fonte oficial consultada trouxe esses números." },
      ],
      espelho: [
        { pais: "Alemanha", txt: "Sistema de equalização fiscal entre estados (Länderfinanzausgleich) constitucionalmente obrigatório e transparente." },
        { pais: "Nórdicos", txt: "Transferências a municípios ligadas a fórmulas públicas de necessidade (idade da população, densidade), não a negociação política caso a caso." },
        { pais: "Coreia do Sul", txt: "Sistema de transferências locais com auditoria centralizada e metas de desempenho dos governos locais." },
      ],
      licao: "Fórmulas de repasse estáveis e públicas, com dados completos e auditáveis — o Brasil ainda não tem isso para todas as áreas do pacto federativo.",
    },

    social: {
      bol: [
        { v: "nao", frase: "O SUS é um poço de desperdício.", dado: "A União gasta 1,84% do PIB em saúde (todas as esferas, ~4%), contra ~8%–9% nos nórdicos. Há ineficiências, mas o SUS é subfinanciado frente às referências." },
        { v: "parte", frase: "A reforma da Previdência resolveu o problema.", dado: "Ela conteve o crescimento (9,1% → 8,8% do PIB na União) e reduziu o RPPS, mas a previdência ainda vale 2,8 vezes saúde e educação, e o envelhecimento acelera." },
      ],
      pt: [
        { v: "sim", frase: "Saúde e educação voltaram a ser prioridade.", dado: "Entre 2022 e 2025, a saúde subiu de 1,36% para 1,84% do PIB e a educação de 1,09% para 1,37% (valores pagos)." },
        { v: "nao", frase: "Não é preciso mexer de novo na Previdência.", dado: "O Brasil gasta com previdência como países europeus mais velhos. Os países de referência ajustam regras automaticamente à expectativa de vida." },
      ],
      espelho: [
        { pais: "Nórdicos", txt: "Saúde pública universal (~8%–9% do PIB) e educação gratuita de alta qualidade, com foco em resultados de aprendizagem." },
        { pais: "Suécia / Dinamarca / Finlândia", txt: "Idade de aposentadoria ligada à expectativa de vida; a Suécia tem ajuste automático do sistema." },
        { pais: "Coreia do Sul", txt: "Resultados educacionais de ponta, com forte investimento das famílias e do Estado." },
      ],
      licao: "Serviços universais de qualidade e previdência ajustada à demografia: as duas agendas se complementam.",
    },

    seguranca_pub: {
      bol: [
        { v: "parte", frase: "A violência só cai onde a polícia age com mão firme, sem amarras.", dado: "MVI, homicídio doloso, latrocínio e roubo caíram nos quatro anos, em governos diferentes. Mas a letalidade policial (MDIP) subiu 56% no mesmo período — mais força policial não impediu, e coincidiu com mais mortes causadas pela própria polícia." },
        { v: "nao", frase: "Estatuto do Desarmamento e políticas de controle de armas não reduzem a violência.", dado: "Esta planilha não tem dados sobre posse de armas para avaliar essa afirmação — nem a favor, nem contra. Fica como \"não é possível checar com estes dados\"." },
      ],
      pt: [
        { v: "sim", frase: "A violência letal caiu para o menor nível da série.", dado: "A taxa de MVI caiu de 30,2 (2016) para 19,1 por 100 mil habitantes (2025), o menor valor dos quatro anos, com queda contínua." },
        { v: "nao", frase: "A segurança pública é só uma pauta conservadora; a esquerda não tem agenda própria.", dado: "Os dados mostram uma agenda distinta possível: feminicídio (+153%) e letalidade policial (+56%) sobem exatamente onde políticas de proteção à mulher e controle do uso da força fariam diferença — pauta historicamente identificada com a esquerda." },
      ],
      espelho: [
        { pais: "Todos os 6 países", txt: "Taxas de homicídio muito abaixo da brasileira (tipicamente 0,5–1,5 por 100 mil habitantes, contra 15,4 no Brasil em 2025)." },
        { pais: "Alemanha / Finlândia", txt: "Controle rígido de armas de fogo e baixíssima taxa de homicídio por arma de fogo." },
        { pais: "Coreia do Sul", txt: "Uma das menores taxas de criminalidade violenta do mundo, associada a policiamento comunitário e alta coesão social." },
        { pais: "Noruega", txt: "Sistema penal focado em reintegração (penas mais curtas, foco em reabilitação) com uma das menores taxas de reincidência do mundo." },
      ],
      licao: "Nos países de referência a segurança combina Estado presente, dados públicos completos e políticas específicas por tipo de violência — não apenas \"mais repressão\" ou \"menos repressão\" em bloco.",
    },

    educacao: {
      bol: [
        { v: "parte", frase: "O problema da educação não é dinheiro, é gestão.", dado: "Em % do PIB (~5,5%, todas as esferas) o Brasil gasta perto da média da OCDE e dos países de referência. Mas por aluno o gasto é uma fração do deles, e a União cortou 15% reais entre 2016 e 2022. As duas coisas importam." },
        { v: "parte", frase: "A queda na educação entre 2019 e 2022 foi por causa da pandemia, não de cortes.", dado: "A queda real começou antes: de R$ 147,6 bi (2016) para R$ 131,5 bi (2019), e continuou até R$ 125,5 bi (2022). A pandemia não explica a tendência." },
        { v: "parte", frase: "O governo Bolsonaro fortaleceu a educação básica com o novo Fundeb.", dado: "A complementação subiu de 0,21% para 0,33% do PIB entre 2019 e 2022. Mas o novo Fundeb (EC 108/2020) foi aprovado por iniciativa do Congresso, que ampliou a proposta inicial do governo." },
        { v: "parte", frase: "O ensino a distância (EAD) democratizou o acesso ao ensino superior.", dado: "A participação do EAD nas matrículas de graduação saltou de 18,6% (2016) para 50,7% (2025), ampliando o acesso numérico. Mas esta planilha não tem dados de evasão ou qualidade do EAD para confirmar se o acesso maior significa formação equivalente." },
      ],
      pt: [
        { v: "sim", frase: "O governo Lula recompôs o orçamento da educação.", dado: "A função Educação paga subiu 39% reais de 2022 a 2025 (R$ 125,5 bi → R$ 174,6 bi), e a Bolsa Permanência +168%." },
        { v: "parte", frase: "O Brasil investe pouco em educação.", dado: "Procede por aluno e na União até 2022. Mas em % do PIB, somando todas as esferas (~5,5%), o Brasil está perto da média da OCDE (~5%). O maior problema é aprendizagem: 379 pontos no PISA de matemática contra 472 na OCDE." },
        { v: "parte", frase: "O Pé-de-Meia está resolvendo a evasão no ensino médio.", dado: "São R$ 13 bi previstos em 2025, pagos por fundo fora do orçamento e questionados pelo TCU. Os dados desta planilha não medem a evasão; o efeito ainda precisa de avaliação." },
        { v: "parte", frase: "O Sisu ampliou fortemente o acesso a vagas públicas.", dado: "As vagas ofertadas pelo Sisu cresceram de 228 mil (2016) para 261,8 mil (2025) — alta de 15% em 9 anos, real mas modesta, não um salto." },
      ],
      espelho: [
        { pais: "Finlândia", txt: "Professores com mestrado, carreira disputada e autonomia; gasto público em educação de ~5,5%–6% do PIB." },
        { pais: "Coreia do Sul", txt: "PISA de matemática de 527 pontos (o maior dos países de referência), com forte cobrança por resultados e grande esforço das famílias." },
        { pais: "Alemanha", txt: "Cerca de metade dos jovens no ensino técnico dual (escola + empresa)." },
        { pais: "Nórdicos", txt: "Ensino superior público gratuito com bolsas de manutenção para os alunos, financiado por impostos altos e progressivos; gasto de ~6%–7% do PIB." },
      ],
      licao: "Nos países de referência, o dinheiro vem junto com metas de aprendizagem, professor valorizado e ensino técnico forte. O Brasil precisa das duas coisas: mais recursos por aluno e cobrança por resultado.",
    },

    afirmativas: {
      bol: [
        { v: "nao", frase: "Bolsa Família é compra de voto e incentiva a não trabalhar.", dado: "O emprego formal cresceu 5,8 milhões de vagas (2022–2025) enquanto o programa se expandia, e o próprio governo Bolsonaro ampliou o benefício em 2022. Estudos no Brasil não encontram desestímulo relevante ao trabalho." },
        { v: "parte", frase: "O Auxílio Brasil foi o maior programa social da história.", dado: "Em 2022 atendeu 21,6 milhões de famílias com R$ 129 bi reais, recorde de famílias. Mas a ampliação veio por emenda constitucional em ano eleitoral, com adicional temporário." },
      ],
      pt: [
        { v: "parte", frase: "O governo ampliou as políticas sociais e raciais.", dado: "Procede para renda (R$ 172 bi) e permanência estudantil (Bolsa Permanência +73%). Mas o programa de igualdade racial pagou só R$ 58 mi em 2025." },
        { v: "nao", frase: "A expansão social cabe no orçamento.", dado: "O subtotal pago saltou de 0,46% para 1,37% do PIB sem fonte permanente, com resultado primário negativo, e o Pé-de-Meia foi pago fora da LOA (questionado pelo TCU)." },
      ],
      espelho: [
        { pais: "Nórdicos", txt: "Benefícios universais (auxílio por filho, creche de qualidade) somados a políticas ativas de emprego." },
        { pais: "Todos", txt: "Programas sociais financiados por impostos permanentes e aprovados no orçamento, com avaliação independente." },
        { pais: "Coreia do Sul", txt: "Rede de proteção ampliada nas últimas décadas junto com a formalização do trabalho." },
      ],
      licao: "Transferências focalizadas, serviços universais e ativação para o emprego, dentro do orçamento e com fonte permanente.",
    },

    corrupcao: {
      bol: [
        { v: "nao", frase: "O governo Lula reduziu o combate à corrupção.", dado: "A queda mais forte que os dados mostram — prisões por corrupção caindo de 421 para 42 — ocorreu entre 2019 e 2022, dentro do próprio governo Bolsonaro. As operações da CGU seguiram baixas em 2023 (37) e 2024 (33) sob Lula, mas como continuação de uma tendência que já vinha de antes, não como um recuo iniciado por ele." },
        { v: "nao", frase: "O Brasil piorou no ranking internacional de corrupção com Lula.", dado: "O CPI (Transparency International) ficou em exatamente 35 pontos tanto em 2019 (governo Bolsonaro) quanto em 2025 (governo Lula) — nenhuma piora foi registrada pelo índice internacional entre os dois pontos medidos." },
      ],
      pt: [
        { v: "parte", frase: "A percepção de corrupção no Brasil melhorou muito nos últimos anos.", dado: "Procede para a preocupação popular (Datafolha: de 32% para 5%–8%), mas o índice internacional de especialistas (CPI) ficou estagnado em 35 pontos entre 2019 e 2025 — a queda parece refletir menos prioridade do tema no debate público, não necessariamente menos corrupção percebida por quem avalia de fora." },
        { v: "parte", frase: "Depois da Lava Jato, o combate à corrupção só piorou.", dado: "As prisões por corrupção já vinham caindo antes do fim da Lava Jato (421 em 2019 para 42 em 2022, ainda no governo Bolsonaro) e as operações da CGU seguiram baixas em 2023–2024. Mas o índice internacional de percepção (CPI) não registrou piora: ficou nos mesmos 35 pontos em 2019 e 2025." },
      ],
      espelho: [
        { pais: "Dinamarca / Finlândia / Noruega", txt: "Estão entre os países mais bem avaliados do mundo no CPI há anos, com pontuação bem acima de 80 (o Brasil está em 35) — resultado de décadas de transparência e imprensa livre, não só de operações policiais pontuais." },
        { pais: "Alemanha", txt: "Mantém pontuação alta e estável no CPI, apoiada em um sistema de compliance corporativo obrigatório reforçado após escândalos como o da Siemens nos anos 2000." },
        { pais: "Coreia do Sul", txt: "Melhorou de forma constante seu índice de percepção de corrupção nas últimas décadas, com leis de transparência rígidas e punição de altos executivos e ex-presidentes." },
      ],
      licao: "Nos países mais bem avaliados, o combate à corrupção não depende de operações midiáticas pontuais: é sustentado por transparência contínua, imprensa livre e instituições estáveis — o que ajuda a explicar por que o CPI do Brasil não se move mesmo quando o número de operações e prisões varia bastante de um governo para outro.",
    },

    fomento: {
      bol: [
        { v: "parte", frase: "O BNDES era uma caixa-preta de corrupção e tinha que encolher.", dado: "Os subsídios de 2008–2014 foram caros e muito criticados, mas a auditoria externa contratada em 2019 não encontrou evidências de corrupção nas operações analisadas. Com o BNDES menor (R$ 137 bi → R$ 77 bi reais), o investimento ficou parado em 15,5% do PIB." },
        { v: "nao", frase: "O agro se financia sozinho, sem ajuda do governo.", dado: "O Plano Safra anunciado equivale a 4,75% do PIB (2025/26), com juros equalizados pelo Tesouro. Os subsídios financeiros e creditícios somam 1,35% do PIB." },
      ],
      pt: [
        { v: "parte", frase: "Um BNDES forte é essencial ao desenvolvimento.", dado: "Os desembolsos voltaram a 1,33% do PIB, mas o P&D nacional segue em 1,2% e a FBCF em 16,8%. A experiência de 2008–14 mostrou alto custo fiscal e efeito limitado sobre o investimento." },
        { v: "sim", frase: "O governo recuperou o orçamento da ciência.", dado: "A função Ciência e Tecnologia empenhou R$ 35 bi em 2025, contra R$ 9,7–10,8 bi reais nos anos anteriores." },
      ],
      espelho: [
        { pais: "Coreia do Sul", txt: "P&D de ~5% do PIB, a maior parte financiada por empresas, com apoio público condicionado a resultados." },
        { pais: "Finlândia / Suécia", txt: "P&D de ~3%–3,5% do PIB e agências de inovação que financiam projetos com avaliação." },
        { pais: "Alemanha", txt: "Banco público de desenvolvimento (KfW) grande, com mandato claro, governança técnica e sem juros subsidiados indiscriminadamente." },
      ],
      licao: "Banco público e fomento funcionam com mandato claro, metas, transparência e foco em inovação: nem desmonte, nem subsídio sem avaliação.",
    },

    emprego: {
      bol: [
        { v: "parte", frase: "A reforma trabalhista gerou empregos.", dado: "Entre 2016 e 2019 o estoque formal subiu só 0,7 milhão (38,4 → 39,1 mi). O grande salto veio depois, com a demanda aquecida. Os dados não permitem isolar o efeito da reforma." },
        { v: "nao", frase: "O desemprego baixo de agora é maquiado.", dado: "A taxa vem da PNAD Contínua do IBGE, com a mesma metodologia desde 2012. As duas séries (anual e trimestral) mostram ~5,6%–5,9%." },
      ],
      pt: [
        { v: "sim", frase: "O desemprego no governo Lula é o menor da série.", dado: "Taxa média de 5,6% em 2025, a menor desde o início da PNAD Contínua (2012), próxima à de Alemanha e Coreia e abaixo da de Suécia e Finlândia." },
        { v: "parte", frase: "O emprego recorde é fruto da política do governo.", dado: "Coincide com a valorização do salário mínimo, as transferências e o crédito, mas também com a recuperação pós-pandemia, a demografia e reformas anteriores. Os dados mostram o resultado (5,6%), não a causa isolada." },
        { v: "parte", frase: "A reforma trabalhista só precarizou o trabalho.", dado: "O emprego formal chegou a 48,5 milhões depois da reforma. Informalidade e \"pejotização\" não aparecem nesses dados e precisam de outra fonte." },
      ],
      espelho: [
        { pais: "Dinamarca", txt: "\"Flexissegurança\": demissão flexível, seguro-desemprego generoso e políticas ativas de emprego (~1,5%–2% do PIB)." },
        { pais: "Alemanha", txt: "Aprendizagem dual (escola + empresa) e negociação coletiva forte." },
        { pais: "Nórdicos", txt: "Sindicatos fortes e ampla cobertura de acordos coletivos, com mercado de trabalho flexível." },
      ],
      licao: "Nem só flexibilizar, nem só proteger: flexibilidade com proteção de renda e qualificação é o que os países de referência praticam.",
    },

    externo: {
      bol: [
        { v: "sim", frase: "O governo bateu recorde de exportações.", dado: "Em 2022, US$ 334 bi, recorde até então (+51% sobre 2019), impulsionado pelos preços das commodities." },
        { v: "nao", frase: "O governo atraiu investimento estrangeiro recorde.", dado: "Pela série atual, o IDP foi de US$ 69 bi (2019) e US$ 75,5 bi (2022): estável, abaixo de 2016 (US$ 74 bi) e de 2025 (US$ 78 bi)." },
      ],
      pt: [
        { v: "sim", frase: "Em 2025 as exportações bateram novo recorde.", dado: "US$ 348 bi, com saldo de US$ 68 bi. Ressalva: o crescimento sobre 2022 foi de só 4%." },
        { v: "nao", frase: "Abrir a economia destrói a indústria nacional.", dado: "Coreia, Alemanha e os nórdicos estão entre as economias mais abertas e mais industrializadas. O Brasil é fechado (~28% do PIB em comércio de bens) e mesmo assim se desindustrializou." },
      ],
      espelho: [
        { pais: "Coreia / Alemanha / Dinamarca", txt: "Comércio de 70% a mais de 100% do PIB, com pauta de alta tecnologia." },
        { pais: "Noruega", txt: "Exporta petróleo, mas poupa a renda no fundo soberano e evita a \"doença holandesa\"." },
        { pais: "Coreia do Sul", txt: "Abertura gradual e estratégica, com cobrança de desempenho exportador das empresas apoiadas." },
      ],
      licao: "Abrir com estratégia, agregar valor à pauta e poupar a renda das commodities. Nem fechamento, nem abertura sem política produtiva.",
    },

    investimento: {
      bol: [
        { v: "sim", frase: "As concessões atraíram capital privado para a infraestrutura.", dado: "O investimento privado foi de R$ 131 bi (2022) a R$ 235 bi (2025): 84% do total. Os marcos regulatórios de vários governos contribuíram." },
        { v: "nao", frase: "Privatizar tudo resolve a infraestrutura.", dado: "Os países de referência mantêm estatais estratégicas (Equinor ~67% e Statkraft 100% estatais na Noruega, Vattenfall 100% na Suécia, KEPCO na Coreia). Ferrovias e saneamento em regiões pobres dependem do Estado." },
      ],
      pt: [
        { v: "parte", frase: "O Novo PAC é a retomada do investimento em infraestrutura.", dado: "O investimento federal em infraestrutura subiu de 0,13% para 0,16% do PIB (2022–2025), ainda abaixo de 2016 (0,25%). O crescimento do total veio sobretudo do setor privado." },
        { v: "parte", frase: "Privatização é entrega do patrimônio nacional.", dado: "Os modelos de referência combinam: a Noruega abriu o capital da Equinor mantendo o controle, e a Alemanha privatizou telecom e correios. O que importa é regulação e interesse público." },
      ],
      espelho: [
        { pais: "Nórdicos", txt: "Estatais em setores estratégicos, geridas com governança de mercado (ações em bolsa, metas, transparência)." },
        { pais: "Todos", txt: "Agências reguladoras técnicas e estáveis, que dão segurança a investidores de longo prazo." },
        { pais: "Coreia do Sul / Alemanha", txt: "Planejamento de longo prazo da infraestrutura de transporte e energia, com ferrovias fortes." },
      ],
      licao: "A questão não é estatal × privado, e sim regulação, planejamento e governança. Os países de referência usam os dois.",
    },
  };
})();
