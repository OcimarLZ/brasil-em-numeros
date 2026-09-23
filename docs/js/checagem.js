/* Narrativas × dados: checagem de narrativas frequentes no debate público
 * (bolsonaristas e petistas) e espelho nos países de referência
 * (Noruega, Suécia, Dinamarca, Finlândia, Coreia do Sul e Alemanha).
 *
 * v (veredito): "sim" = procede | "parte" = procede em parte | "nao" = não procede
 * Checam-se narrativas, não pessoas. Cada lado tem o mesmo número de itens por página.
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
