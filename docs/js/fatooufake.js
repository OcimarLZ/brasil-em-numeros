/* "Fato ou Fake": não é uma checagem própria — é uma curadoria do que agências de
 * checagem já estabelecidas apuraram sobre política, economia, o que os candidatos
 * declaram e boatos que circulam nas redes, incluindo urnas eletrônicas.
 *
 * Regra desta página: NUNCA um veredito nosso sobre uma alegação de campanha ainda
 * não checada por ninguém. Todo item cita o verificador, a data e o link, e usa o
 * rótulo que o PRÓPRIO verificador deu (Falso/Verdadeiro/Impreciso/Exagerado/Falta
 * contexto) — sem forçar a escala "procede/não procede" usada em Narrativas × Dados,
 * porque ali o veredito é nosso (a partir da planilha); aqui o veredito é de terceiros.
 */
(function () {
  window.FATOOUFAKE = {
    atualizado: "22/09/2026",
    aviso:
      "Eleição em curso (1º turno em 04/10/2026): o que segue é o que agências de " +
      "checagem já publicaram até a data acima — não uma apuração própria deste site " +
      "sobre a campanha. Novas alegações surgem todos os dias; o link de cada item vai " +
      "direto à checagem original, sempre a fonte mais atualizada.",
    secoes: [
      {
        id: "urnas",
        titulo: "Urnas eletrônicas",
        desc: "O tema mais recorrente de desinformação eleitoral no Brasil desde 2018. O consenso técnico (TSE, PF, entidades internacionais, testes públicos de segurança) é estável há anos: não há registro de fraude desde a informatização do voto.",
        itens: [
          {
            alegacao: "O TSE anunciou novas urnas eletrônicas para as eleições de 2026.",
            contexto: "Publicação em redes sociais, julho/2026.",
            veredito: "Falso",
            verificadores: [
              { nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/tse-novas-urnas-eletronicas-eleicoes/" },
              { nome: "Agência Lupa", url: "https://www.agencialupa.org/jornalismo/2026/07/31/e-falso-que-o-tse-anunciou-novas-urnas-eletronicas-para-eleicoes-de-2026/" },
            ],
            explicacao: "Não há registro de anúncio de um novo modelo de urna. Para 2026, o TSE usará os modelos já em uso (UE2013, UE2015, UE2020 e UE2022).",
          },
          {
            alegacao: "Hackers invadiram as urnas eletrônicas durante o teste de segurança do TSE.",
            contexto: "Repercussão do Teste Público de Segurança (TPS) do TSE.",
            veredito: "Falso",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/hackers-urnas-eletronicas-teste-seguranca/" }],
            explicacao: "Foram 29 tentativas de ataque no teste público; nenhuma alterou voto ou resultado. É esperado que especialistas tentem invadir o sistema — esse é o propósito do teste.",
          },
          {
            alegacao: "O TSE vai destruir 195 mil urnas para esconder provas de fraude.",
            contexto: "Publicação viral em redes sociais.",
            veredito: "Falso",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/tse-destruir-urnas-provas-fraude/" }],
            explicacao: "O descarte de urnas antigas é um procedimento administrativo de renovação de equipamento, não relacionado a ocultar fraude.",
          },
          {
            alegacao: "Eu fui bem claro a dizer que jamais questionei a questão do processo eleitoral.",
            contexto: "Flávio Bolsonaro, entrevista ao Jornal Nacional, 28/08/2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Agência Lupa", url: "https://www.agencialupa.org/checagem/2026/08/28/ao-vivo-checagem-da-entrevista-de-flavio-bolsonaro-ao-jornal-nacional/" }],
            explicacao: "Há declarações documentadas do próprio candidato, entre 2014 e 2022, questionando a integridade do sistema eletrônico de votação e a possibilidade de auditoria.",
          },
        ],
      },
      {
        id: "lula",
        titulo: "O que Lula declara",
        desc: "Checagens de entrevistas e falas de campanha do candidato à reeleição — inclui acertos e erros, na proporção em que apareceram nas fontes consultadas.",
        itens: [
          {
            alegacao: "O PIB cresceu 3%, sabe, em 2023, 2024, 2025.",
            contexto: "Entrevista à TV Globo, campanha 2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/checamos-entrevista-lula-globo/" }],
            explicacao: "O Brasil cresceu acima de 3% em poucos anos da série recente; 2025 fechou em 2,3%, não 3% — desinformação que já havia sido checada antes.",
          },
          {
            alegacao: "Já acabei com a fome duas vezes.",
            contexto: "Entrevista à TV Globo, campanha 2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/checamos-entrevista-lula-globo/" }],
            explicacao: "O Brasil saiu do Mapa da Fome da ONU em 2014 e em 2025, mas isso não equivale a erradicar a fome: 3,2% da população (6,4 milhões de pessoas) ainda enfrentava insegurança alimentar grave em 2024.",
          },
          {
            alegacao: "Sobre Roberta Luchsinger (citada no escândalo do INSS): \"Eu não conheço essa moça, nunca vi essa moça.\"",
            contexto: "Entrevista à TV Globo, campanha 2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/checamos-entrevista-lula-globo/" }],
            explicacao: "Luchsinger publicou ao menos duas fotos ao lado de Lula em seu próprio perfil, em outubro de 2022.",
          },
          {
            alegacao: "Tínhamos 5 milhões de trabalhadores com diploma universitário [em 2003]. Hoje nós temos 25 milhões.",
            contexto: "Entrevista à TV Globo, campanha 2026.",
            veredito: "Verdadeiro",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/checamos-entrevista-lula-globo/" }],
            explicacao: "Em 2003 eram cerca de 5,5 milhões de empregados com ensino superior; em 2025, cerca de 25,5 milhões — a alegação confere.",
          },
        ],
      },
      {
        id: "flavio",
        titulo: "O que Flávio Bolsonaro declara",
        desc: "Checagens de entrevistas e falas de campanha do candidato ao Palácio do Planalto — inclui acertos, erros e afirmações exageradas, na proporção em que apareceram nas fontes consultadas.",
        itens: [
          {
            alegacao: "O Pix, que foi ali criado no governo do presidente Bolsonaro.",
            contexto: "Entrevista ao Jornal Nacional, 28/08/2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Agência Lupa", url: "https://www.agencialupa.org/checagem/2026/08/28/ao-vivo-checagem-da-entrevista-de-flavio-bolsonaro-ao-jornal-nacional/" }],
            explicacao: "O Pix foi concebido pelo Banco Central em 2018, no governo Michel Temer; Bolsonaro apenas o lançou ao público no fim de 2020.",
          },
          {
            alegacao: "Negou que o aquecimento global seja causado principalmente pela ação humana.",
            contexto: "Entrevista ao Jornal Nacional, 28/08/2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Agência Lupa", url: "https://www.agencialupa.org/checagem/2026/08/28/ao-vivo-checagem-da-entrevista-de-flavio-bolsonaro-ao-jornal-nacional/" }],
            explicacao: "O consenso científico internacional (IPCC/ONU) é de que a atividade humana é a principal causa do aquecimento observado desde meados do século 20.",
          },
          {
            alegacao: "Sobre o financiamento do documentário \"Dark Horse\" e a relação com Daniel Vorcaro (Banco Master): informações já estariam \"apresentadas\".",
            contexto: "Entrevista ao Jornal Nacional, 28/08/2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Agência Lupa", url: "https://www.agencialupa.org/checagem/2026/08/28/ao-vivo-checagem-da-entrevista-de-flavio-bolsonaro-ao-jornal-nacional/" }],
            explicacao: "Uma perícia independente não encontrou documentação de suporte (contratos, extratos bancários); a origem de US$ 20,9 milhões gastos no Brasil segue sem explicação.",
          },
          {
            alegacao: "Disse que sempre pediu a instalação da CPMI do Banco Master.",
            contexto: "Entrevista ao Jornal Nacional, 28/08/2026.",
            veredito: "Exagerado",
            verificadores: [{ nome: "Agência Lupa", url: "https://www.agencialupa.org/checagem/2026/08/28/ao-vivo-checagem-da-entrevista-de-flavio-bolsonaro-ao-jornal-nacional/" }],
            explicacao: "Ele assinou apenas 2 dos 5 pedidos de CPMI disponíveis, e só depois que áudios vazados vieram a público.",
          },
        ],
      },
      {
        id: "viral",
        titulo: "Boatos e campanhas virais nas redes",
        desc: "Conteúdo que circulou de forma ampla nas redes sociais e foi verificado por agências de checagem — vídeos fora de contexto, teorias da conspiração e simulações apresentadas como reais.",
        itens: [
          {
            alegacao: "Vídeo mostrando uma simulação de fraude eletrônica em urna de votação.",
            contexto: "Vídeo viral em grupos de redes sociais.",
            veredito: "Enganoso",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/video-mostra-simulacao-de-fraude-em-urna-diferente-da-usada-no-brasil/" }],
            explicacao: "A urna do vídeo é de um modelo diferente do usado no Brasil — a simulação não corresponde ao sistema eleitoral brasileiro.",
          },
          {
            alegacao: "Lula seria um \"clone\" ou sósia, e não a pessoa real.",
            contexto: "Teoria da conspiração recorrente, ressurgida com a campanha 2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Aos Fatos", url: "https://www.aosfatos.org/noticias/desmentimos-mais-provas-de-que-lula-e-um-clone/" }],
            explicacao: "As \"provas\" apresentadas (variações de aparência, voz e assinatura) têm explicações comuns — idade, edição de imagem e variação natural — e já foram desmentidas repetidas vezes.",
          },
          {
            alegacao: "Vídeo no TikTok afirmando que Flávio Bolsonaro viajou aos Estados Unidos em 13 de setembro de 2026.",
            contexto: "Vídeo viral no TikTok, setembro/2026.",
            veredito: "Falso",
            verificadores: [{ nome: "Comprova", url: "https://imirante.com/noticias/brasil/2026/09/17/flavio-bolsonaro-nao-viajou-aos-eua-em-setembro" }],
            explicacao: "As imagens são de maio de 2026, quando o senador de fato viajou aos EUA e se reuniu com Donald Trump — usadas fora do contexto original.",
          },
        ],
      },
    ],
  };
})();
