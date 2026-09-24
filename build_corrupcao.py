# -*- coding: utf-8 -*-
"""Corrupção – indicadores comparáveis 2016 x 2019 x 2022 x 2025 (xlsx).

Mesma convenção de linha das demais planilhas (Código/Indicador/Conceito/Âmbito/
Unidade/Brasil{ano}x4/Variação x4/Fonte{ano}x4/Classificação/Observações), para
ser lida sem alterações por aba_tematica() em scripts/gerar_dados.py.

Nota honesta: ao contrário da LOA/segurança/pacto federativo/educação (que vieram
de uma planilha já apurada por pesquisa anterior), os indicadores de corrupção
comparáveis ano a ano são escassos e fragmentados: não há uma fonte única com
os quatro anos. Esta planilha reúne só o que foi possível confirmar de forma
cruzada em mais de uma busca; os anos sem dado ficam como "não localizado após
busca", igual ao resto do projeto. Consulta em 23/09/2026, com várias páginas
oficiais (CGU, Agência Gov) fora do ar por causa da legislação eleitoral —
mesma limitação já registrada na aba "Fontes e metodologia" do workbook fiscal.
"""
import sys
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment
from openpyxl.utils import get_column_letter

OUT = sys.argv[1] if len(sys.argv) > 1 else "Corrupcao_2016_2019_2022_2025.xlsx"

CAB = [
    "Código", "Indicador", "Conceito / detalhe", "Âmbito", "Unidade",
    "Brasil 2016", "Brasil 2019", "Brasil 2022", "Brasil 2025",
    "Variação 2016→2019", "Variação 2019→2022", "Variação 2022→2025", "Variação 2016→2025",
    "Fonte 2016", "Fonte 2019", "Fonte 2022", "Fonte 2025",
    "Classificação do dado", "Observações metodológicas",
]
NL = "não localizado após busca"


def var(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)) or a == 0:
        return "n.a."
    return round((b / a - 1) * 100, 1)


def linha(cod, ind, conc, amb, un, v16, v19, v22, v25, f16, f19, f22, f25, classe, obs):
    return [
        cod, ind, conc, amb, un, v16, v19, v22, v25,
        var(v16, v19), var(v19, v22), var(v22, v25), var(v16, v25),
        f16, f19, f22, f25, classe, obs,
    ]


LINHAS = [
    linha(
        "1", "Índice de Percepção de Corrupção (CPI)",
        "Percepção de corrupção no setor público — 0 (muito corrupto) a 100 (muito íntegro)",
        "Brasil", "pontos (0–100)",
        NL, 35, NL, 35,
        NL, "Transparency International (C01)", NL, "Transparency International (C01)",
        "OFICIAL",
        "Índice publicado anualmente pela Transparency International. 2016 e 2022 não "
        "localizados com segurança nesta busca (fontes secundárias trouxeram valores "
        "divergentes — 38 e 40 para 2016, conforme a fonte — sem confirmação direta no "
        "relatório original); por isso ficaram como não localizado, em vez de publicar um "
        "número não conferido.",
    ),
    linha(
        "1.1", "CPI — posição no ranking mundial",
        "Posição do Brasil entre os países avaliados no mesmo ano",
        "Brasil", "número",
        NL, 106, NL, 107,
        NL, "Transparency International (C01)", NL, "Transparency International (C01)",
        "OFICIAL",
        "2019: 106º de 180 países. 2025: 107º de 182 países (o total de países avaliados "
        "varia um pouco de ano para ano).",
    ),
    linha(
        "2", "Corrupção como principal problema do Brasil (Datafolha)",
        "% de entrevistados que citam corrupção, espontaneamente, como o principal "
        "problema do país",
        "Brasil", "%",
        32, NL, 5, 8,
        "Datafolha, via Jornal do Brasil (C02)", NL, "Datafolha, via Folha de Valinhos (C03)",
        "Datafolha, via CNN Brasil (C04)",
        "IMPRENSA/SETORIAL",
        "2016: pesquisa de julho/2016, no rescaldo do impeachment. 2022: pesquisa de "
        "março/2022, com corrupção em 4º lugar entre as preocupações (atrás de saúde, "
        "segurança e economia). 2025: dado de dezembro/2025 citado como comparação "
        "histórica dentro de reportagem de março/2026 sobre a pesquisa mais recente "
        "(9% em mar/2026). 2019 não localizado com um valor único e confiável — as buscas "
        "trouxeram só uma faixa (14%–22% em setembro/2019) sem consolidação clara.",
    ),
    linha(
        "3", "Operações de combate à corrupção deflagradas (CGU)",
        "Operações de responsabilização de agentes públicos e empresas por corrupção",
        "União", "número",
        NL, 59, NL, NL,
        NL, "CGU, via Gazeta do Povo (C05)", NL, NL,
        "OFICIAL",
        "Dado fornecido oficialmente pela CGU à reportagem. Série CGU (mesma fonte, anos "
        "fora da grade): 2020 = 96 (pico); 2023 = 37; 2024 = 33 (até outubro, ano ainda não "
        "fechado na fonte). 2016, 2022 e 2025 não localizados com o mesmo critério nesta "
        "busca.",
    ),
    linha(
        "4", "Prisões em operações da Polícia Federal por corrupção",
        "Pessoas presas no âmbito de operações de combate à corrupção",
        "Brasil", "número",
        NL, 421, 42, NL,
        NL, "Reportagens com dado obtido via Lei de Acesso à Informação (C06)",
        "Reportagens com dado obtido via Lei de Acesso à Informação (C06)", NL,
        "IMPRENSA/SETORIAL",
        "Números reproduzidos de forma consistente por mais de um veículo (queda de "
        "cerca de 90% entre 2019 e 2022), a partir de dados obtidos via Lei de Acesso à "
        "Informação junto à Polícia Federal — não é uma publicação direta da PF. 2016 e "
        "2025 não localizados nesta busca.",
    ),
]

NOTAS = [
    "Esta é uma aba mais esparsa que as demais: não existe uma única fonte oficial com "
    "série anual comparável de corrupção para 2016, 2019, 2022 e 2025 — cada indicador "
    "vem de uma fonte diferente, e vários anos ficaram sem dado apesar da busca.",
    "Índices de percepção (CPI, Datafolha) medem como a corrupção é vista, não quanto "
    "dela existe de fato; números de operações e prisões medem esforço/resultado de "
    "investigação, que depende de prioridade política e de regras de prisão vigentes em "
    "cada momento — não são medidas diretas do nível de corrupção.",
    "Consulta em 23/09/2026. Várias páginas oficiais (CGU, Agência Gov) estavam fora do "
    "ar por causa da legislação eleitoral, limitando o acesso a dados primários — mesma "
    "restrição já registrada no workbook fiscal principal.",
    "'n.d.' = não disponível (célula 'não localizado após busca' para aquele ano). "
    "Períodos 2016→2019, 2019→2022 e 2022→2025 correspondem aproximadamente aos "
    "mandatos Temer, Bolsonaro e Lula III (até 2025); 2016 inclui o governo Dilma até maio.",
]

FONTES = [
    ("C01", "Brazil - Transparency.org / Corruption Perceptions Index",
     "Transparency International", "https://www.transparency.org/en/countries/brazil",
     "Consulta 23/09/2026", "2019 e 2025", "CPI — pontuação e posição no ranking",
     "Página do país", "Score 2019 = 35 (106º/180); score 2025 = 35 (107º/182).", "Alta"),
    ("C02", "Datafolha: para 32%, corrupção é o principal problema brasileiro",
     "Jornal do Brasil (dados Datafolha)",
     "https://www.jb.com.br/pais/noticias/2016/07/16/datafolha-para-32-corrupcao-e-o-principal-problema-brasileiro.html",
     "16/07/2016", "2016", "Corrupção como principal problema do país (%)",
     "Notícia", "", "Alta (reproduz Datafolha)"),
    ("C03", "Pesquisa Datafolha aponta corrupção como 4ª maior preocupação dos brasileiros em ano eleitoral",
     "Folha de Valinhos (dados Datafolha)",
     "https://www.folhadevalinhos.com.br/brasil-e-mundo/pesquisa-datafolha-corrupcao-preocupacao-brasileiros/",
     "03/2022", "2022", "Corrupção como principal problema do país (%)",
     "Notícia", "5%, atrás de saúde (22%) e economia (15%).", "Alta (reproduz Datafolha)"),
    ("C04", "Datafolha: 9% dos eleitores citam corrupção como principal problema do país",
     "CNN Brasil (dados Datafolha)",
     "https://www.cnnbrasil.com.br/politica/datafolha-9-dos-eleitores-citam-corrupcao-como-principal-problema-do-pais/",
     "03/2026", "dez/2025 e mar/2026", "Corrupção como principal problema do país (%)",
     "Notícia", "Usado o dado de dez/2025 (8%), citado no texto como comparação histórica.",
     "Alta (reproduz Datafolha)"),
    ("C05", "Operações de combate à corrupção diminuem com Lula no governo",
     "Gazeta do Povo (dados CGU)",
     "https://www.gazetadopovo.com.br/republica/operacoes-de-combate-a-corrupcao-diminuem-com-lula-no-governo/",
     "2026", "2019, 2020, 2023 e 2024", "Operações deflagradas de combate à corrupção",
     "Reportagem com dados oficiais fornecidos pela CGU",
     "2019=59; 2020=96; 2023=37; 2024=33 (até out.).", "Alta (reproduz CGU)"),
    ("C06", "Prisões em ações da PF contra corrupção caíram 90% durante a gestão de Bolsonaro, mostra site",
     "CartaCapital (dado obtido via LAI)",
     "https://www.cartacapital.com.br/politica/prisoes-em-acoes-da-pf-contra-corrupcao-cairam-90-durante-a-gestao-de-bolsonaro-mostra-site/",
     "2023", "2019 e 2022", "Prisões em operações de combate à corrupção",
     "Reportagem com dado via Lei de Acesso à Informação",
     "421 prisões em 2019 → 42 em 2022. Número reproduzido de forma consistente por "
     "outros veículos consultados.", "Média (imprensa, dado via LAI, não publicação direta da PF)"),
]

TENTATIVAS = [
    ("CPI Brasil 2016 e 2022 (valor exato)", "Transparency.org, Wikipedia, agregadores (tradingeconomics, statbase, worlddata)",
     "Fontes secundárias divergiram (2016: 38 ou 40, conforme a fonte) sem confirmação no relatório original; não publicado para evitar erro."),
    ("Datafolha corrupção como principal problema em 2019 (valor único)", "Buscas por notícias de set/2019",
     "Só foi localizada uma faixa (14%–22% em setembro/2019), sem um valor único consolidado."),
    ("CEIS/CNEP — número de empresas sancionadas por ano", "Portal CGU (Banco de Sanções)",
     "O portal descreve os cadastros, mas não publica série histórica de contagem anual em formato acessível a esta busca."),
    ("Controle de Corrupção — Banco Mundial (WGI), percentil", "World Bank DataBank, agregadores",
     "Buscas retornaram valores incompatíveis entre si para o mesmo indicador (uma resposta trouxe percentil ~4-12 para 2016-2022; outra, 34,4% para 2023) — descartado por inconsistência, sem verificação direta na base do Banco Mundial."),
    ("Valores recuperados pela Lava Jato, por ano", "Diversas notícias (MPF, STF, imprensa)",
     "Valores encontrados (R$4,3 bi a R$6+ bi) são acumulados ao longo da operação, sem corte anual claro que permita atribuir a um dos quatro anos da série; não incluído na tabela para não sugerir uma data que a fonte não confirma."),
]


def montar():
    wb = Workbook()
    ws = wb.active
    ws.title = "Corrupção"
    ws.append(["Corrupção – indicadores comparáveis (percepção, apuração e resultado)"])
    ws.append([
        "Indicadores fragmentados de mais de uma fonte (não há um único levantamento "
        "oficial com os quatro anos). Ver observações de cada linha e a aba de fontes."
    ])
    ws.append(CAB)
    for r in LINHAS:
        ws.append(r)
    ws.append([])
    ws.append(["Notas metodológicas"])
    for i, n in enumerate(NOTAS, 1):
        ws.append([f"{i}. {n}"])

    for c in range(1, len(CAB) + 1):
        ws.cell(row=3, column=c).font = Font(bold=True, size=9)
    ws.cell(row=1, column=1).font = Font(bold=True, size=13)
    ws.cell(row=2, column=1).font = Font(italic=True, size=10)
    for col, w in zip(range(1, len(CAB) + 1), [5, 34, 30, 10, 13] + [11] * 8 + [24] * 4 + [14, 42]):
        ws.column_dimensions[get_column_letter(col)].width = w
    for row in ws.iter_rows(min_row=4, max_row=3 + len(LINHAS)):
        for cell in row:
            cell.alignment = Alignment(wrap_text=True, vertical="top")

    wsf = wb.create_sheet("Fontes e metodologia")
    wsf.append(["Fontes e metodologia"])
    wsf.append(["Todas as fontes consultadas em 23/09/2026."])
    wsf.append([
        "ID", "Título da fonte", "Instituição", "URL", "Data da publicação",
        "Ano de referência", "Indicador utilizado", "Página ou tabela", "Observações",
        "Nível de confiabilidade",
    ])
    for f in FONTES:
        wsf.append(list(f))
    wsf.append([])
    wsf.append(["Dados não localizados ou só aproximados – tentativas de busca"])
    wsf.append([None, "Item", None, "Fontes tentadas", None, None, None, None, "Resultado / tratamento"])
    for item, tent, res in TENTATIVAS:
        wsf.append([None, item, None, tent, None, None, None, None, res])
    for c in range(1, 11):
        wsf.cell(row=3, column=c).font = Font(bold=True, size=9)
    wsf.column_dimensions["B"].width = 40
    wsf.column_dimensions["D"].width = 45
    wsf.column_dimensions["I"].width = 45

    wb.save(OUT)
    print(f"{OUT}: {len(LINHAS)} indicadores, {len(FONTES)} fontes, {len(TENTATIVAS)} tentativas registradas")


if __name__ == "__main__":
    montar()
