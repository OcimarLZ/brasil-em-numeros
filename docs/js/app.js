/* Economia Brasileira em Números — renderização das páginas */
(function () {
  "use strict";

  const D = window.DADOS;
  const P = D.parametros;
  const ANOS = P.anos;
  const NBSP = " ";

  // ---------------------------------------------------------------- estado
  const est = { modo: "real", pagina: null, graficos: [] };
  try { est.modo = localStorage.getItem("modo") || "real"; } catch (e) {}

  // ---------------------------------------------------------------- dados
  function acha(ref) {
    const [aba, cod, estagio] = ref;
    const linhas = (D.abas[aba] || {}).linhas || [];
    return linhas.find((l) => l.cod === cod && (!estagio || l.estagio.startsWith(estagio))) || null;
  }

  // Resolve a especificação de uma série em {nome, unidade, v[4], linha}
  function serie(spec) {
    if (spec.calc === "resto") {
      const base = acha(spec.base);
      const partes = spec.menos.map(acha);
      const v = base.v.map((x, i) => (x == null ? null : x - partes.reduce((s, p) => s + (p && p.v[i] != null ? p.v[i] : 0), 0)));
      return { nome: spec.nome, unidade: base.unidade, v, linha: null };
    }
    if (spec.calc === "razao") {
      const a = acha(spec.num), b = acha(spec.den);
      const v = a.v.map((x, i) => (x == null || !b.v[i] ? null : x / b.v[i]));
      return { nome: spec.nome, unidade: "%", v, linha: null };
    }
    const l = acha(spec.r);
    if (!l) {
      if (!spec.opcional) console.warn("Indicador não encontrado:", spec.r);
      return null;
    }
    return { nome: spec.nome || l.nome, unidade: l.unidade, v: l.v, linha: l };
  }

  // Tipo da unidade
  function tipo(u) {
    if (u === "R$ bi" || u === "R$ mi") return "brl";
    if (u === "US$ bi") return "usd";
    if (u === "%" || u === "% do PIB") return "pct";
    if (u === "pessoas") return "pessoas";
    if (u.startsWith("milhões de ")) return "mipessoas";
    if (u === "R$ por mês") return "brlmes";
    if (u === "número") return "num";
    if (u === "por 100 mil hab.") return "taxa100k";
    return "outro";
  }

  // Converte a série para o modo atual → {vals, unid, tipo}
  function converte(s, modo) {
    const t = tipo(s.unidade);
    const m = modo || est.modo;
    if (t === "pct") return { vals: s.v.map((x) => (x == null ? null : x * 100)), unid: "%", tipo: "pct" };
    if (t === "brl") {
      const div = s.unidade === "R$ mi" ? 1000 : 1;
      if (m === "pib") return { vals: s.v.map((x, i) => (x == null ? null : (x / div / P.pib[i]) * 100)), unid: "% do PIB", tipo: "pct" };
      if (m === "real") return { vals: s.v.map((x, i) => (x == null ? null : x * P.fator[i])), unid: s.unidade, tipo: "brl", real: true };
      return { vals: s.v.slice(), unid: s.unidade, tipo: "brl" };
    }
    if (t === "brlmes") {
      if (m === "real") return { vals: s.v.map((x, i) => (x == null ? null : x * P.fator[i])), unid: s.unidade, tipo: t, real: true };
      return { vals: s.v.slice(), unid: s.unidade, tipo: t };
    }
    if (t === "usd") {
      if (m === "pib") return { vals: s.v.map((x, i) => (x == null ? null : (x / P.pib_usd[i]) * 100)), unid: "% do PIB", tipo: "pct" };
      return { vals: s.v.slice(), unid: "US$ bi", tipo: "usd" };
    }
    return { vals: s.v.slice(), unid: s.unidade, tipo: t };
  }

  // ---------------------------------------------------------------- formatação
  const nf = (d) => new Intl.NumberFormat("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const f = (x, d) => nf(d).format(x);
  const casas = (x) => { const a = Math.abs(x); return a >= 100 ? 1 : a >= 10 ? 1 : a >= 1 ? 2 : 3; };

  // Formato compacto (KPIs, tooltips, eixos): retorna [número, sufixo]
  function partes(x, c) {
    if (x == null || isNaN(x)) return ["—", ""];
    if (x === 0) return ["0", ""];
    const a = Math.abs(x);
    switch (c.tipo) {
      case "pct": return [f(x, a < 2 ? 2 : 1), "%"];
      case "brl":
      case "usd": {
        const moeda = c.tipo === "usd" ? "US$" : "R$";
        if (c.unid === "R$ mi") return [moeda + NBSP + f(x, a >= 100 ? 0 : 1), "mi"];
        if (a >= 1000) return [moeda + NBSP + f(x / 1000, 2), "tri"];
        if (a < 1) return [moeda + NBSP + f(x * 1000, 0), "mi"];
        return [moeda + NBSP + f(x, a >= 100 ? 0 : 1), "bi"];
      }
      case "pessoas":
        if (a >= 1e6) return [f(x / 1e6, a >= 1e7 ? 1 : 2), "mi"];
        if (a >= 1e3) return [f(x / 1e3, 0), "mil"];
        return [f(x, 0), ""];
      case "mipessoas": return [f(x, 1), "mi"];
      case "brlmes": return ["R$" + NBSP + f(x, 0), "/mês"];
      case "num":
        if (a >= 1e6) return [f(x / 1e6, a >= 1e7 ? 1 : 2), "mi"];
        if (a >= 1e3) return [f(x / 1e3, 0), "mil"];
        return [f(x, 0), ""];
      case "taxa100k": return [f(x, 1), ""];
      default: return [f(x, casas(x)), c.unid || ""];
    }
  }
  const fmt = (x, c) => { const [n, s] = partes(x, c); return s ? n + NBSP + s : n; };

  // Formato de tabela: número na unidade da coluna
  function fmtTab(x, c) {
    if (x == null) return null;
    if (c.tipo === "pct") return f(x, Math.abs(x) < 2 ? 2 : 1);
    if (c.tipo === "pessoas" || c.tipo === "num") return f(x, 0);
    if (c.tipo === "taxa100k") return f(x, 1);
    const a = Math.abs(x);
    return f(x, a >= 100 ? 1 : a >= 1 ? 2 : 3);
  }

  // Variação entre dois anos: % (ou p.p. para taxas; diferença absoluta se trocar de sinal)
  function variacao(a, b, c) {
    if (a == null || b == null) return null;
    if (c.tipo === "pct") { const d = b - a; return { txt: (d > 0 ? "+" : d < 0 ? "−" : "") + f(Math.abs(d), 1) + NBSP + "p.p.", d }; }
    if (a <= 0 || b <= 0) { const d = b - a; return { txt: (d > 0 ? "+" : "−") + fmt(Math.abs(d), c), d }; }
    const d = (b / a - 1) * 100;
    return { txt: (d > 0 ? "+" : d < 0 ? "−" : "") + f(Math.abs(d), Math.abs(d) < 10 ? 1 : 0) + "%", d };
  }
  const seta = (d) => (d > 0 ? "▲" : d < 0 ? "▼" : "•");

  function descModo(c) {
    if (c.tipo === "brl") return c.unid === "% do PIB" ? "% do PIB" : est.modo === "real" ? c.unid + " de dez/2025 (IPCA)" : c.unid + " correntes";
    if (c.tipo === "usd") return "US$ bi correntes" + (est.modo === "real" ? " (sem correção pelo IPCA)" : "");
    if (c.tipo === "pct") return c.unid === "% do PIB" || est.modo === "pib" ? "% do PIB" : "%";
    if (c.tipo === "pessoas") return "pessoas";
    if (c.tipo === "mipessoas") return c.unid;
    if (c.tipo === "brlmes") return "R$ por mês" + (c.real ? " de dez/2025 (IPCA)" : " correntes");
    return c.unid;
  }

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  };

  // ---------------------------------------------------------------- cores
  function cores() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    return {
      serie: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => v("--s" + i)),
      rampa: [1, 2, 3, 4, 5].map((i) => v("--r" + i)),
      pos: v("--pos"), neg: v("--neg"),
      superficie: v("--surface"), tinta: v("--ink"), tinta2: v("--ink-2"), tinta3: v("--ink-3"),
      grade: v("--grid"), eixo: v("--axis"),
    };
  }
  const RAMPA_ANOS = [0, 1, 3, 4]; // índices da rampa usados para 2016→2025

  // ---------------------------------------------------------------- KPIs
  function sparkSVG(vals) {
    const w = 120, h = 30, n = vals.length, bw = 20, gap = (w - n * bw) / (n - 1);
    const nums = vals.filter((x) => x != null);
    if (!nums.length) return "";
    const max = Math.max(0, ...nums), min = Math.min(0, ...nums), span = max - min || 1;
    const zero = h - 10 - ((0 - min) / span) * (h - 12);
    let s = `<svg class="spark" viewBox="0 0 ${w} ${h}" aria-hidden="true">`;
    vals.forEach((x, i) => {
      const xi = i * (bw + gap);
      if (x != null) {
        const y = h - 10 - ((x - min) / span) * (h - 12);
        const top = Math.min(y, zero), alt = Math.max(1.5, Math.abs(zero - y));
        s += `<rect x="${xi}" y="${top}" width="${bw}" height="${alt}" rx="2" class="${x < 0 ? "neg" : i === n - 1 ? "ult" : ""}"/>`;
      }
      s += `<text x="${xi + bw / 2}" y="${h - 1}" text-anchor="middle">${String(ANOS[i]).slice(2)}</text>`;
    });
    return s + "</svg>";
  }

  function kpi(spec) {
    const s = serie(spec);
    if (!s) return el("div");
    const c = converte(s);
    const [n, suf] = partes(c.vals[3], c);
    const v16 = variacao(c.vals[0], c.vals[3], c), v22 = variacao(c.vals[2], c.vals[3], c);
    const tag = spec.link ? "a" : "div";
    const card = el(tag, { class: "kpi" });
    if (spec.link) card.href = "#" + spec.link;
    card.innerHTML =
      `<span class="rot">${esc(spec.nome || s.nome)}</span>` +
      `<span class="val">${n}${suf ? `<small>${suf}</small>` : ""}</span>` +
      `<span class="nota">2025 · ${esc(descModo(c))}</span>` +
      `<span class="deltas">` +
      (v22 ? `<span>vs 2022 <b>${seta(v22.d)} ${v22.txt}</b></span>` : "") +
      (v16 ? `<span>vs 2016 <b>${seta(v16.d)} ${v16.txt}</b></span>` : "") +
      `</span>` + sparkSVG(c.vals);
    card.title = ANOS.map((a, i) => `${a}: ${fmt(c.vals[i], c)}`).join("\n");
    return card;
  }

  // ---------------------------------------------------------------- gráficos
  function legendaHTML(itens, linha) {
    return `<ul class="legenda${linha ? " linha" : ""}">` + itens.map((it) => `<li><i style="background:${it.cor}"></i>${esc(it.nome)}</li>`).join("") + "</ul>";
  }

  function grafico(spec) {
    const cartao = el("figure", { class: "cartao" + (spec.larga ? " larga" : "") });
    cartao.style.margin = "0";
    const series = spec.series.map(serie).filter((s) => s && s.v.some((x) => x != null));
    if (!series.length) return cartao;
    const conv = series.map((s) => converte(s));
    const c0 = conv[0];
    const K = cores();

    const sub = [spec.sub, descModo(c0)].filter(Boolean).join(" · ");
    cartao.innerHTML = `<h3>${esc(spec.titulo)}</h3><p class="sub">${esc(sub)}</p>`;

    const cat = spec.tipo === "categorias";
    const corDe = (i) => (spec.rampa ? K.rampa[spec.series.findIndex((x) => x.nome === series[i].nome)] : K.serie[i % 8]);

    let datasets, labels;
    if (cat) {
      labels = series.map((s) => s.nome);
      datasets = ANOS.map((a, j) => ({
        label: String(a),
        data: conv.map((c) => c.vals[j]),
        backgroundColor: K.rampa[RAMPA_ANOS[j]],
        borderRadius: 4, borderSkipped: "start", barPercentage: 0.85, categoryPercentage: 0.8,
      }));
      cartao.insertAdjacentHTML("beforeend", legendaHTML(ANOS.map((a, j) => ({ nome: String(a), cor: K.rampa[RAMPA_ANOS[j]] }))));
    } else {
      labels = ANOS.map(String);
      const empilhaDs = spec.tipo === "empilhado";
      datasets = series.map((s, i) => {
        const cor = corDe(i);
        const base = { label: s.nome, data: conv[i].vals };
        if (spec.tipo === "linhas") {
          return Object.assign(base, {
            type: "line", borderColor: cor, backgroundColor: cor, borderWidth: 2,
            pointRadius: 4, pointHoverRadius: 6, pointBorderColor: K.superficie, pointBorderWidth: 2, tension: 0, spanGaps: false,
          });
        }
        return Object.assign(base, {
          backgroundColor: spec.sinal ? conv[i].vals.map((x) => (x < 0 ? K.neg : K.pos)) : cor,
          borderRadius: spec.tipo === "empilhado" ? 0 : 4,
          borderSkipped: "start",
          borderColor: K.superficie,
          borderWidth: spec.tipo === "empilhado" ? { top: 2 } : 0,
          barPercentage: 0.9, categoryPercentage: empilhaDs ? 0.55 : series.length > 3 ? 0.85 : 0.7,
        });
      });
      if (series.length > 1) cartao.insertAdjacentHTML("beforeend", legendaHTML(series.map((s, i) => ({ nome: s.nome, cor: corDe(i) })), spec.tipo === "linhas"));
      else if (spec.sinal) cartao.insertAdjacentHTML("beforeend", legendaHTML([{ nome: "Positivo", cor: K.pos }, { nome: "Negativo", cor: K.neg }]));
    }

    const area = el("div", { class: "area-graf" });
    if (cat) area.style.height = Math.max(280, series.length * 64 + 40) + "px";
    const canvas = el("canvas", { role: "img", "aria-label": spec.titulo + ". " + series.map((s, i) => s.nome + ": " + ANOS.map((a, j) => a + " " + fmt(conv[i].vals[j], conv[i])).join(", ")).join("; ") });
    area.appendChild(canvas);
    cartao.appendChild(area);
    if (spec.nota || (c0.tipo === "usd" && est.modo === "real")) {
      const notas = [spec.nota, c0.tipo === "usd" && est.modo === "real" ? "Valores em US$ não são corrigidos pelo IPCA." : null].filter(Boolean);
      cartao.insertAdjacentHTML("beforeend", `<p class="rodape-graf">${esc(notas.join(" "))}</p>`);
    }

    const empilha = spec.tipo === "empilhado";
    const eixoValor = {
      stacked: empilha,
      beginAtZero: spec.tipo !== "linhas",
      grid: { color: K.grade, drawTicks: false },
      border: { display: false },
      ticks: { color: K.tinta3, padding: 6, maxTicksLimit: 6, callback: (v) => fmt(v, c0) },
    };
    const eixoCat = {
      stacked: empilha,
      grid: { display: false },
      border: { color: K.eixo },
      ticks: { color: K.tinta2, font: { size: 12 } },
    };
    const ch = new Chart(canvas, {
      type: "bar",
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 250 },
        indexAxis: cat ? "y" : "x",
        interaction: { mode: "index", intersect: false },
        layout: { padding: { top: 6, right: 8 } },
        scales: cat ? { x: eixoValor, y: eixoCat } : { x: eixoCat, y: eixoValor },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: K.superficie, titleColor: K.tinta, bodyColor: K.tinta2, borderColor: K.eixo, borderWidth: 1,
            padding: 10, boxPadding: 4, usePointStyle: true, cornerRadius: 8,
            callbacks: {
              label: (ctx) => {
                const c = cat ? conv[ctx.dataIndex] : conv[ctx.datasetIndex];
                return " " + ctx.dataset.label + ": " + fmt(ctx.parsed[cat ? "x" : "y"], c);
              },
              footer: (itens) => {
                if (!empilha || itens.length < 2) return "";
                const t = itens.reduce((s, it) => s + (it.parsed.y || 0), 0);
                return "Total: " + fmt(t, c0);
              },
              labelColor: (ctx) => {
                const bg = ctx.dataset.backgroundColor;
                const cor = Array.isArray(bg) ? bg[ctx.dataIndex] : bg;
                return { borderColor: cor, backgroundColor: cor, borderRadius: 3 };
              },
            },
          },
        },
      },
    });
    est.graficos.push(ch);
    return cartao;
  }

  // ---------------------------------------------------------------- tabelas
  const ESTAGIOS = /^(Dotação inicial|Dotação atualizada|Orçamento atualizado$|Empenhado|Liquidado|Pago|Restos a pagar)/;
  const classeSelo = (c) => {
    const k = (c || "").toUpperCase();
    if (k.startsWith("OFICIAL")) return "oficial";
    if (k.startsWith("ESTIM")) return "estimado";
    if (k.startsWith("APROX")) return "aproximacao";
    if (k.startsWith("IMPRENSA")) return "imprensa";
    return "nl";
  };
  const nivelCod = (cod) => Math.min(2, (cod.match(/\./g) || []).length);

  // Uma tabela pode ser uma aba inteira ("pib") ou uma seleção de linhas de várias abas:
  // { chave, titulo, subtitulo, linhas: [[aba, cod], ...] } — inclui todos os estágios do código.
  function resolveTabela(item) {
    if (typeof item === "string") return Object.assign({ chave: item }, D.abas[item]);
    const linhas = [];
    item.linhas.forEach(([aba, cod]) => D.abas[aba].linhas.forEach((l) => { if (l.cod === cod) linhas.push(l); }));
    return { chave: item.chave, titulo: item.titulo, subtitulo: item.subtitulo || "", linhas, notas: item.notas || [] };
  }

  function tabela(abas) {
    const frag = document.createDocumentFragment();
    abas.forEach((item) => {
      const A = resolveTabela(item);
      const bloco = el("div", { class: "bloco-tab" });
      bloco.style.marginBottom = "16px";
      const acoes = el("div", { class: "tab-acoes" });
      acoes.innerHTML = `<p><b>${esc(A.titulo)}</b> — ${esc(A.subtitulo)} Clique numa linha para ver fonte e observações.</p>`;
      const btn = el("button", { class: "btn", type: "button" }, "Baixar CSV");
      btn.addEventListener("click", () => baixaCSV(A));
      acoes.appendChild(btn);
      bloco.appendChild(acoes);

      const wrap = el("div", { class: "tab-wrap" });
      const t = el("table", { class: "dados" });
      t.innerHTML = `<thead><tr><th scope="col">Indicador</th><th scope="col">Unidade</th>${ANOS.map((a) => `<th scope="col">${a}</th>`).join("")}<th scope="col">Var. 2016→2025</th><th scope="col">Dado</th></tr></thead>`;
      const tb = el("tbody");
      let anterior = null;
      A.linhas.forEach((l) => {
        const s = { nome: l.nome, unidade: l.unidade, v: l.v };
        const c = converte(s);
        const ehEstagio = ESTAGIOS.test(l.estagio);
        const continua = anterior && anterior.cod === l.cod && ehEstagio;
        let nv = nivelCod(l.cod);
        if (continua) nv = Math.min(2, nv + 1);
        const rotulo = continua
          ? `<span class="seta">›</span> ${esc(l.estagio)}`
          : `<span class="seta">›</span> <span class="cod">${esc(l.cod)}</span>${esc(l.nome)}${ehEstagio ? `<span class="est">${esc(l.estagio)}</span>` : ""}`;
        const celulas = c.vals.map((x, i) => {
          const txt = fmtTab(x, c);
          return txt == null ? `<td class="falta">${esc(l.falta[i] || "—")}</td>` : `<td class="num">${txt}</td>`;
        }).join("");
        const va = variacao(c.vals[0], c.vals[3], c);
        const selo = l.corrigido
          ? `<span class="selo corrigido" title="Valores de 2016/2022 corrigidos em relação à planilha">CORRIGIDO</span>`
          : `<span class="selo ${classeSelo(l.classe)}">${esc(l.classe || "—")}</span>`;
        const tr = el("tr", { class: "linha nv" + nv, tabindex: "0", "aria-expanded": "false" });
        tr.innerHTML = `<td>${rotulo}</td><td class="un">${esc(descUnidTab(c))}</td>${celulas}<td class="num">${va ? va.txt : "—"}</td><td>${selo}</td>`;
        const det = el("tr", { class: "detalhe", hidden: "" });
        det.innerHTML = `<td colspan="8"><dl>` +
          (ehEstagio ? "" : `<dt>Conceito</dt><dd>${esc(l.estagio)}</dd>`) +
          `<dt>Âmbito</dt><dd>${esc(l.ambito)}</dd>` +
          `<dt>Fontes</dt><dd>${ANOS.map((a, i) => `${a}: ${esc(l.fontes[i] || "—")}`).join(" · ")}</dd>` +
          (l.obs && l.obs !== "—" ? `<dt>Observações</dt><dd>${esc(l.obs)}</dd>` : "") +
          (l.corrigido ? `<dt>Correção</dt><dd>Na planilha original, 2016 e 2022 desta linha traziam valores de outra série (colisão de chaves no script gerador). Aqui foram usados os valores do IBGE/SIDRA 1846.</dd>` : "") +
          `<dt>Nominal</dt><dd>${ANOS.map((a, i) => `${a}: ${l.v[i] == null ? "—" : fmtTab(converte(s, "nominal").vals[i], converte(s, "nominal"))}`).join(" · ")} (${esc(l.unidade)})</dd>` +
          `</dl></td>`;
        const alterna = () => {
          const aberto = det.hidden;
          det.hidden = !aberto;
          tr.classList.toggle("aberta", aberto);
          tr.setAttribute("aria-expanded", String(aberto));
        };
        tr.addEventListener("click", alterna);
        tr.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alterna(); } });
        tb.appendChild(tr);
        tb.appendChild(det);
        anterior = l;
      });
      t.appendChild(tb);
      wrap.appendChild(t);
      bloco.appendChild(wrap);
      if (A.notas && A.notas.length) {
        const notas = A.notas.filter((n) => !/^(Valores nominais|Colunas de variação|% do PIB com|'n\.a\.'|Cor da linha)/.test(n));
        if (notas.length) bloco.insertAdjacentHTML("beforeend", `<ul class="notas">${notas.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`);
      }
      frag.appendChild(bloco);
    });
    return frag;
  }

  function descUnidTab(c) {
    if (c.tipo === "brl" || c.tipo === "brlmes") return c.unid === "% do PIB" ? "% PIB" : c.unid + (c.real ? " (dez/25)" : "");
    if (c.tipo === "pct") return c.unid === "% do PIB" ? "% PIB" : "%";
    return c.unid;
  }

  function baixaCSV(A) {
    const q = (s) => '"' + String(s == null ? "" : s).replace(/"/g, '""') + '"';
    const linhas = [["Código", "Indicador", "Conceito/estágio", "Unidade", ...ANOS.map(String), "Classificação", "Observações"].map(q).join(";")];
    A.linhas.forEach((l) => {
      const c = converte({ unidade: l.unidade, v: l.v });
      linhas.push([l.cod, l.nome, l.estagio, descUnidTab(c), ...c.vals.map((x, i) => (x == null ? l.falta[i] : String(+x.toFixed(6)).replace(".", ","))), l.classe, l.obs].map(q).join(";"));
    });
    const blob = new Blob(["﻿" + linhas.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = el("a", { href: URL.createObjectURL(blob), download: `${A.chave}_${est.modo}.csv` });
    document.body.appendChild(a); a.click(); a.remove();
  }

  // ---------------------------------------------------------------- blocos de texto
  const HTML = {
    sintese() {
      const d = el("div", { class: "sintese" });
      D.resumo.sintese.forEach((s) => d.insertAdjacentHTML("beforeend", `<article><h3>${esc(s.titulo)}</h3><p>${esc(s.texto)}</p></article>`));
      return d;
    },
    parametros() {
      const w = el("div", { class: "tab-wrap" });
      const lin = [
        ["PIB (R$ bi correntes, IBGE)", P.pib, 1],
        ["IPCA – número-índice de dezembro", P.ipca, 2],
        ["Fator de correção para R$ de dez/2025", P.fator, 4],
        ["PTAX média anual (R$/US$)", P.ptax, 4],
        ["PIB em US$ bi", P.pib_usd, 1],
      ];
      w.innerHTML = `<table class="dados" style="min-width:560px"><thead><tr><th>Parâmetro</th>${ANOS.map((a) => `<th>${a}</th>`).join("")}</tr></thead><tbody>` +
        lin.map(([n, v, d]) => `<tr><td>${esc(n)}</td>${v.map((x) => `<td class="num">${f(x, d)}</td>`).join("")}</tr>`).join("") +
        `</tbody></table>`;
      const box = el("div");
      box.appendChild(w);
      box.insertAdjacentHTML("beforeend", `<p class="aviso"><b>Como ler:</b> use o seletor no topo. <b>Nominal</b> mostra o valor do próprio ano; <b>Real</b> corrige reais pelo IPCA para dezembro de 2025, permitindo comparar anos; <b>% do PIB</b> mostra o peso de cada valor na economia. Períodos 2016→2019, 2019→2022 e 2022→2025 correspondem aproximadamente aos governos Temer, Bolsonaro e Lula III (2016 inclui Dilma até maio).</p>`);
      return box;
    },
    legenda() {
      const d = el("div", { class: "sintese" });
      D.resumo.legenda.forEach((l) => d.insertAdjacentHTML("beforeend", `<article><h3><span class="selo ${classeSelo(l.classe)}">${esc(l.classe)}</span></h3><p>${esc(l.descricao)}</p></article>`));
      d.insertAdjacentHTML("beforeend", `<article><h3><span class="selo corrigido">CORRIGIDO</span></h3><p>Linhas do PIB setorial em que a planilha trazia, para 2016 e 2022, valores de outra série (importações no lugar de impostos líquidos; admissões no lugar de administração pública). O site usa os valores do IBGE/SIDRA 1846.</p></article>`);
      return d;
    },
    fontes() {
      const w = el("div", { class: "tab-wrap" });
      w.innerHTML = `<table class="dados lista-fontes"><thead><tr><th>ID</th><th>Fonte</th><th>Instituição</th><th>Referência</th><th>Indicador</th><th>Confiabilidade</th></tr></thead><tbody>` +
        D.metodologia.fontes.map((s) => `<tr><td>${esc(s.id)}</td><td>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.titulo)}</a>` : esc(s.titulo)}${s.obs ? `<span class="est">${esc(s.obs)}</span>` : ""}</td><td>${esc(s.instituicao)}</td><td>${esc(s.referencia)}</td><td>${esc(s.indicador)}</td><td>${esc(s.confiabilidade)}</td></tr>`).join("") +
        `</tbody></table>`;
      return w;
    },
    tentativas() {
      const w = el("div", { class: "tab-wrap" });
      w.innerHTML = `<table class="dados lista-fontes"><thead><tr><th>Item</th><th>Fontes tentadas</th><th>Resultado / tratamento</th></tr></thead><tbody>` +
        D.metodologia.tentativas.map((t) => `<tr><td>${esc(t.item)}</td><td>${esc(t.tentadas)}</td><td>${esc(t.resultado)}</td></tr>`).join("") +
        `</tbody></table>`;
      return w;
    },
    regras() {
      return el("ol", { class: "notas", style: "font-size:14px;color:var(--ink-2)" }, D.metodologia.regras.map((r) => `<li>${esc(r)}</li>`).join(""));
    },
    fato_urnas: () => secaoFato("urnas"),
    fato_lula: () => secaoFato("lula"),
    fato_flavio: () => secaoFato("flavio"),
    fato_viral: () => secaoFato("viral"),
    guia_sobre() {
      const d = el("div");
      d.innerHTML =
        `<p>Este site compara a economia e as contas públicas do Brasil em quatro momentos — ` +
        `<b>2016</b>, <b>2019</b>, <b>2022</b> e <b>2025</b>, aproximadamente os mandatos Temer, ` +
        `Bolsonaro e Lula III (2016 inclui o governo Dilma até maio) — a partir de três planilhas: ` +
        `uma fiscal (PIB, receitas, despesas, dívida), uma complementar (LOA por órgão, segurança, ` +
        `pacto federativo, educação em números) e uma de corrupção.</p>` +
        `<p>São 18 páginas ao todo. Cada uma desce do dado maior para o mais detalhado: começa nos ` +
        `números que cabem numa manchete (o PIB, a dívida, a arrecadação) e termina no programa, ` +
        `no tributo ou na estatística específica — sempre com a fonte de cada número, uma linha ` +
        `abaixo.</p>`;
      return d;
    },
    guia_leitura() {
      const d = el("div", { class: "sintese" });
      d.insertAdjacentHTML("beforeend",
        `<article><h3>Nominal, Real ou % do PIB</h3><p>O seletor no topo da tela muda todos os ` +
        `valores em reais do site de uma vez. <b>Nominal</b> mostra o valor do próprio ano; ` +
        `<b>Real</b> corrige pela inflação (IPCA) para reais de dezembro de 2025, o jeito correto ` +
        `de comparar anos diferentes; <b>% do PIB</b> mostra o peso de cada valor no tamanho da ` +
        `economia daquele ano.</p></article>` +
        `<article><h3>Tabelas e fontes</h3><p>Toda página termina numa tabela completa. Clique numa ` +
        `linha para abrir a fonte de cada ano e as observações metodológicas; o botão "Baixar CSV" ` +
        `exporta a tabela inteira. Os pontos coloridos (<a href="#fontes">ver legenda completa</a>) ` +
        `mostram se o dado é oficial, uma estimativa, uma aproximação ou não foi localizado.</p></article>` +
        `<article><h3>Menu e celular</h3><p>No computador, o menu fica na horizontal, no topo. No ` +
        `celular (telas até 760px), ele vira um botão "≡" que abre a lista de áreas na vertical.</p></article>` +
        `<article><h3>Tema claro e escuro</h3><p>O ícone da lua/sol no canto superior direito alterna ` +
        `entre os dois temas; a escolha fica salva no navegador.</p></article>`);
      return d;
    },
    guia_estrutura() {
      const d = el("div");
      d.innerHTML =
        `<p>Quase toda página segue a mesma ordem, do agregado ao detalhe:</p>` +
        `<ol class="notas" style="font-size:14px;color:var(--ink-2)">` +
        `<li><b>Indicadores e gráficos</b>, em níveis — do número mais geral ao mais específico.</li>` +
        `<li><b>Avaliação</b>: cards de impacto positivo, negativo e pontos de atenção, com boas práticas.</li>` +
        `<li><b>A quem interessa o que está ocorrendo</b>: quem ganha e quem perde com aqueles números.</li>` +
        `<li><b>Duas leituras dos mesmos dados</b>: como a visão liberal e a desenvolvimentista interpretam os números.</li>` +
        `<li><b>Narrativas × dados</b>: frases do debate público checadas contra os dados, com espelho em outros países.</li>` +
        `<li><b>Tabela completa</b>, com fonte e observação de cada linha.</li>` +
        `</ol>` +
        `<p class="aviso"><b>Duas exceções:</b> a página <a href="#corrupcao">Corrupção</a> tem menos dado disponível ` +
        `e avisa isso logo no início. A página <a href="#fato_ou_fake">Fato ou Fake</a> é bem diferente das outras: ` +
        `não vem de planilha, e o veredito de cada item é de um verificador externo (Aos Fatos, Agência Lupa, ` +
        `Comprova) — nunca um veredito deste site sobre algo que ainda não foi checado por ninguém.</p>`;
      return d;
    },
    guia_dicas: () => secaoDicas(),
  };

  // Uma seção de "Fato ou Fake": cards com alegação, veredito do verificador e link.
  // Vereditos vêm de agências de checagem externas (Aos Fatos, Lupa, Comprova) — não
  // é um veredito próprio deste site, por isso o rótulo é o que o verificador usou.
  function secaoFato(id) {
    const sec = (window.FATOOUFAKE || { secoes: [] }).secoes.find((s) => s.id === id);
    if (!sec) return el("div");
    const CLS = { Falso: "av-neg", Enganoso: "av-neg", Verdadeiro: "av-pos", Exagerado: "av-at", Impreciso: "av-at", "Falta contexto": "av-at" };
    const box = el("div");
    if (sec.desc) box.insertAdjacentHTML("beforeend", `<p class="av-resumo">${esc(sec.desc)}</p>`);
    const grade = el("div", { class: "grade-av" });
    sec.itens.forEach((it) => {
      const cls = CLS[it.veredito] || "av-at";
      grade.insertAdjacentHTML("beforeend",
        `<article class="av ${cls}">` +
        `<span class="av-tipo"><i aria-hidden="true">${it.veredito === "Verdadeiro" ? "✓" : it.veredito === "Falso" || it.veredito === "Enganoso" ? "✕" : "!"}</i>${esc(it.veredito)}</span>` +
        `<blockquote class="fato-alegacao">“${esc(it.alegacao)}”</blockquote>` +
        `<p class="fato-contexto">${esc(it.contexto)}</p>` +
        `<p>${esc(it.explicacao)}</p>` +
        `<p class="fato-verificado">Verificado por ${it.verificadores.map((v) => `<a href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.nome)}</a>`).join(" e ")}</p>` +
        `</article>`);
    });
    box.appendChild(grade);
    return box;
  }

  // Grade de "dicas" do guia: pergunta + resposta + link direto para a página.
  function secaoDicas() {
    const G = window.GUIA || { grupos: [] };
    const box = el("div");
    G.grupos.forEach((g) => {
      box.insertAdjacentHTML("beforeend", `<h3 class="dicas-grupo">${esc(g.titulo)}</h3>`);
      const grade = el("div", { class: "grade-av" });
      g.dicas.forEach((d) => {
        grade.insertAdjacentHTML("beforeend",
          `<article class="av dica">` +
          `<h4>${esc(d.pergunta)}</h4>` +
          `<p>${esc(d.resposta)}</p>` +
          `<a class="dica-link" href="#${esc(d.pagina)}">Ver em ${esc(d.label)} →</a>` +
          `</article>`);
      });
      box.appendChild(grade);
    });
    return box;
  }

  // ---------------------------------------------------------------- avaliação
  const TIPOS_AV = {
    pos: { rot: "Impacto positivo", icone: "✓" },
    neg: { rot: "Impacto negativo", icone: "✕" },
    at: { rot: "Ponto de atenção", icone: "!" },
  };

  function avaliacao(id) {
    const av = (window.AVALIACOES || {})[id];
    if (!av) return null;
    const C = window.CRITERIOS;
    const box = el("div", { class: "avaliacao" });
    if (id === "visao") {
      box.insertAdjacentHTML("beforeend",
        `<div class="criterios">${Object.keys(C).map((k) => `<div><span class="tag">${esc(C[k].nome)}</span><p>${esc(C[k].desc)}</p></div>`).join("")}</div>`);
    }
    box.insertAdjacentHTML("beforeend", `<p class="av-resumo">${esc(av.resumo)}</p>`);
    const ordem = { pos: 0, neg: 1, at: 2 };
    const grade = el("div", { class: "grade-av" });
    av.cards.slice().sort((x, y) => ordem[x.tipo] - ordem[y.tipo]).forEach((c) => {
      const t = TIPOS_AV[c.tipo];
      grade.insertAdjacentHTML("beforeend",
        `<article class="av av-${c.tipo}">` +
        `<span class="av-tipo"><i aria-hidden="true">${t.icone}</i>${t.rot}</span>` +
        `<h3>${esc(c.titulo)}</h3><p>${esc(c.texto)}</p>` +
        `<div class="tags">${c.crit.map((k) => `<span class="tag" title="${esc(C[k].desc)}">${esc(C[k].nome)}</span>`).join("")}</div>` +
        `</article>`);
    });
    box.appendChild(grade);
    if (av.praticas && av.praticas.length) {
      box.insertAdjacentHTML("beforeend",
        `<div class="praticas"><h3>Boas práticas recomendadas</h3><ul>${av.praticas.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>`);
    }
    box.insertAdjacentHTML("beforeend", `<p class="av-nota">Avaliação analítica, não oficial, feita a partir dos dados desta planilha e de referências usuais em finanças públicas (FMI, OCDE, Banco Mundial). Sinaliza tendências; não substitui estudos de impacto.</p>`);
    return box;
  }

  // ---------------------------------------------------------------- duas leituras
  function leituras(id) {
    const L = (window.LEITURAS || {})[id];
    if (!L) return null;
    const V = window.VISOES;
    const box = el("div", { class: "leituras" });
    box.insertAdjacentHTML("beforeend", `<p class="av-resumo">Os mesmos números sustentam interpretações opostas. Abaixo, cada visão é apresentada com seus argumentos mais fortes — são tipos ideais simplificados; muitos economistas combinam elementos das duas.</p>`);
    const col = (k) => {
      const v = V[k], d = L[k];
      return `<article class="visao visao-${k}">` +
        `<header><span class="visao-ic" aria-hidden="true">${v.icone}</span><div><h3>${esc(v.nome)}</h3><span class="visao-sub">${esc(v.sub)}</span></div></header>` +
        `<p class="visao-leitura">${esc(d.leitura)}</p>` +
        `<h4>Dados que enfatiza</h4><ul>${d.destaques.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` +
        `<h4>O que propõe</h4><ul>${d.propostas.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` +
        `</article>`;
    };
    box.insertAdjacentHTML("beforeend", `<div class="grade-visoes">${col("lib")}${col("dev")}</div>`);
    box.insertAdjacentHTML("beforeend",
      `<div class="ponte"><div><span class="ponte-rot">≈ Onde concordam</span><p>${esc(L.consenso)}</p></div>` +
      `<div><span class="ponte-rot">≠ Onde divergem</span><p>${esc(L.divergencia)}</p></div></div>`);
    return box;
  }

  // ---------------------------------------------------------------- quem ganha, quem perde
  function beneficiarios(id) {
    const B = (window.BENEFICIARIOS || {})[id];
    if (!B) return null;
    const box = el("div", { class: "beneficiarios" });
    box.insertAdjacentHTML("beforeend", `<p class="av-resumo">${esc(B.resumo)}</p>`);
    const col = (rot, icone, cls, itens) =>
      `<section class="lado-bp ${cls}"><h3>${icone} ${esc(rot)}</h3><ul>` +
      itens.map((it) => `<li><b>${esc(it.grupo)}</b><span>${esc(it.texto)}</span></li>`).join("") +
      `</ul></section>`;
    box.insertAdjacentHTML("beforeend",
      `<div class="grade-bp">${col("Quem ganha", "▲", "bp-ganha", B.ganham)}${col("Quem perde", "▼", "bp-perde", B.perdem)}</div>`);
    box.insertAdjacentHTML("beforeend", `<p class="av-nota">Análise de grupos afetados (stakeholders), não de mérito — o mesmo efeito pode ser considerado bom ou ruim conforme o ponto de vista de quem ganha ou perde com ele. Sinaliza tendências a partir dos dados desta página; não é um estudo de incidência distributiva.</p>`);
    return box;
  }

  // ---------------------------------------------------------------- narrativas × dados
  const VEREDITOS = {
    sim: { rot: "Procede", icone: "✓", cls: "av-pos" },
    parte: { rot: "Procede em parte", icone: "≈", cls: "av-at" },
    nao: { rot: "Não procede", icone: "✕", cls: "av-neg" },
  };

  function checagem(id) {
    const C = (window.CHECAGEM || {})[id];
    if (!C) return null;
    const LD = window.LADOS;
    const box = el("div", { class: "checagem" });
    box.insertAdjacentHTML("beforeend", `<p class="av-resumo">Frases que circulam no debate público, confrontadas com os números desta página e com o que fazem os países de referência. Checam-se narrativas, não pessoas. Critério do veredito: o dado. Não há equilíbrio forçado entre os lados.</p>`);
    const col = (k) =>
      `<section class="lado"><header><h3>${esc(LD[k].nome)}</h3><span class="visao-sub">${esc(LD[k].sub)}</span></header>` +
      C[k].map((it) => {
        const v = VEREDITOS[it.v];
        return `<article class="nar ${v.cls}"><span class="av-tipo"><i aria-hidden="true">${v.icone}</i>${v.rot}</span>` +
          `<blockquote>“${esc(it.frase)}”</blockquote><p>${esc(it.dado)}</p></article>`;
      }).join("") + `</section>`;
    box.insertAdjacentHTML("beforeend", `<div class="grade-visoes">${col("bol")}${col("pt")}</div>`);
    box.insertAdjacentHTML("beforeend",
      `<div class="espelho"><h3>Espelho: Noruega, Suécia, Dinamarca, Finlândia, Coreia do Sul e Alemanha</h3>` +
      `<ul>${C.espelho.map((e) => `<li><span class="tag">${esc(e.pais)}</span> ${esc(e.txt)}</li>`).join("")}</ul>` +
      `<p class="licao"><b>Lição para o Brasil:</b> ${esc(C.licao)}</p></div>`);
    box.insertAdjacentHTML("beforeend", `<p class="av-nota">Dados do Brasil: planilha deste site. Referências internacionais aproximadas (estatísticas nacionais e OCDE, anos recentes), para ordem de grandeza. Os períodos de governo são aproximados: 2019 e 2022 (Bolsonaro), 2025 (Lula III); 2016 inclui Dilma e Temer.</p>`);
    return box;
  }

  // ---------------------------------------------------------------- páginas
  function limpaGraficos() {
    est.graficos.forEach((g) => g.destroy());
    est.graficos = [];
  }

  function renderiza(id, manterScroll) {
    const pg = window.PAGINAS.find((p) => p.id === id) || window.PAGINAS[0];
    const y = window.scrollY;
    est.pagina = pg.id;
    limpaGraficos();
    const app = document.getElementById("app");
    app.innerHTML = "";

    const cab = el("section", { class: "cab-pagina" });
    cab.innerHTML = `<h1>${esc(pg.titulo)}</h1><p>${esc(pg.desc)}</p>` +
      (pg.trilha ? `<div class="trilha" aria-label="Do agregado ao detalhe">${pg.trilha.map((t) => `<span>${esc(t)}</span>`).join("<i>→</i>")}</div>` : "");
    app.appendChild(cab);

    // insere a avaliação antes da tabela completa (ou ao final)
    const niveis = pg.niveis.slice();
    if ((window.AVALIACOES || {})[pg.id]) {
      const iTab = niveis.findIndex((n) => n.tabela);
      const nvAv = { titulo: "Avaliação: impactos positivos e negativos", desc: "Sustentabilidade fiscal · autonomia externa · justiça social · bem-estar · atratividade ao investimento", avaliacao: true };
      const pos = pg.id === "visao" ? 1 : iTab >= 0 ? iTab : niveis.length;
      niveis.splice(pos, 0, nvAv);
    }
    if ((window.BENEFICIARIOS || {})[pg.id]) {
      const iAv = niveis.findIndex((n) => n.avaliacao);
      const iTab = niveis.findIndex((n) => n.tabela);
      const pos = iAv >= 0 ? iAv + 1 : iTab >= 0 ? iTab : niveis.length;
      niveis.splice(pos, 0, { titulo: "A quem interessa o que está ocorrendo", desc: "Quem são os beneficiados e os prejudicados por trás dos números", beneficiarios: true });
    }
    if ((window.LEITURAS || {})[pg.id]) {
      const iBen = niveis.findIndex((n) => n.beneficiarios);
      const iAv = niveis.findIndex((n) => n.avaliacao);
      const iTab = niveis.findIndex((n) => n.tabela);
      const pos = iBen >= 0 ? iBen + 1 : iAv >= 0 ? iAv + 1 : iTab >= 0 ? iTab : niveis.length;
      niveis.splice(pos, 0, { titulo: "Duas leituras dos mesmos dados", desc: "Visão liberal × visão desenvolvimentista", leituras: true });
    }
    if ((window.CHECAGEM || {})[pg.id]) {
      const iL = niveis.findIndex((n) => n.leituras);
      const iTab = niveis.findIndex((n) => n.tabela);
      const pos = iL >= 0 ? iL + 1 : iTab >= 0 ? iTab : niveis.length;
      niveis.splice(pos, 0, { titulo: "Narrativas × dados", desc: "Onde bolsonaristas e petistas acertam e erram · espelho nos países de referência", checagem: true });
    }

    niveis.forEach((nv, i) => {
      const sec = el("section", { class: "nivel" });
      const rotNivel = pg.id === "fontes" ? "" : `<span class="num">Nível ${i + 1}</span>`;
      sec.innerHTML = `<div class="nivel-cab">${rotNivel}<h2>${esc(nv.titulo)}</h2>${nv.desc ? `<p>${esc(nv.desc)}</p>` : ""}</div>`;
      if (nv.kpis) {
        const g = el("div", { class: "grade-kpi" });
        nv.kpis.forEach((k) => g.appendChild(kpi(k)));
        sec.appendChild(g);
      }
      if (nv.graficos) {
        const g = el("div", { class: "grade-graf" });
        if (nv.kpis) g.style.marginTop = "12px";
        sec.appendChild(g);
        nv.graficos.forEach((spec) => g.appendChild(grafico(spec)));
      }
      if (nv.tabela) sec.appendChild(tabela(nv.tabela));
      if (nv.html) sec.appendChild(HTML[nv.html]());
      if (nv.avaliacao) sec.appendChild(avaliacao(pg.id));
      if (nv.beneficiarios) sec.appendChild(beneficiarios(pg.id));
      if (nv.leituras) sec.appendChild(leituras(pg.id));
      if (nv.checagem) sec.appendChild(checagem(pg.id));
      app.appendChild(sec);
    });

    document.querySelectorAll("#menu a").forEach((a) => {
      if (a.dataset.id === pg.id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const atual = document.querySelector(`#menu a[data-id="${pg.id}"]`);
    if (atual) atual.scrollIntoView({ block: "nearest", inline: "nearest" });
    document.title = (pg.id === "visao" ? "" : pg.menu + " · ") + "Economia Brasileira em Números";
    const rot = document.getElementById("menuRotulo");
    if (rot) rot.textContent = pg.menu;
    fechaMenu();
    window.scrollTo(0, manterScroll ? y : 0);
  }

  // ---------------------------------------------------------------- controles
  function montaMenu() {
    const nav = document.getElementById("menu");
    nav.innerHTML = window.PAGINAS.map((p) => `<a href="#${p.id}" data-id="${p.id}">${esc(p.menu)}</a>`).join("");
  }

  // menu em drawer vertical no celular: abre/fecha com o botão hamburguer
  function fechaMenu() {
    const nav = document.getElementById("menu"), btn = document.getElementById("btnMenu");
    if (!nav || !btn) return;
    nav.classList.remove("aberto");
    btn.setAttribute("aria-expanded", "false");
  }
  function alternaMenu() {
    const nav = document.getElementById("menu"), btn = document.getElementById("btnMenu");
    const abrindo = !nav.classList.contains("aberto");
    nav.classList.toggle("aberto", abrindo);
    btn.setAttribute("aria-expanded", String(abrindo));
  }

  function marcaModo() {
    document.querySelectorAll(".seg button").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.modo === est.modo)));
  }

  function init() {
    if (typeof Chart === "undefined") {
      document.getElementById("app").innerHTML = "<p>Não foi possível carregar a biblioteca de gráficos (Chart.js). Verifique a conexão.</p>";
      return;
    }
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    Chart.defaults.font.size = 12;
    montaMenu();
    marcaModo();

    document.getElementById("btnMenu").addEventListener("click", (e) => { e.stopPropagation(); alternaMenu(); });
    document.addEventListener("click", (e) => {
      const nav = document.getElementById("menu");
      if (nav.classList.contains("aberto") && !nav.contains(e.target) && e.target.id !== "btnMenu") fechaMenu();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechaMenu(); });

    document.querySelectorAll(".seg button").forEach((b) =>
      b.addEventListener("click", () => {
        est.modo = b.dataset.modo;
        try { localStorage.setItem("modo", est.modo); } catch (e) {}
        marcaModo();
        renderiza(est.pagina, true);
      })
    );

    document.getElementById("btnTema").addEventListener("click", () => {
      const raiz = document.documentElement;
      const escuroAgora = raiz.dataset.theme ? raiz.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      raiz.dataset.theme = escuroAgora ? "light" : "dark";
      try { localStorage.setItem("tema", raiz.dataset.theme); } catch (e) {}
      renderiza(est.pagina, true);
    });
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (!document.documentElement.dataset.theme) renderiza(est.pagina, true);
    });

    const rota = () => renderiza((location.hash || "#guia").slice(1));
    window.addEventListener("hashchange", rota);
    rota();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
