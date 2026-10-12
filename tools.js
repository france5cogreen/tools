/* ============================================================
   Free tools — shared chrome (nav, footer, related tools) + helpers.
   Each tool page sets <body data-tool="slug" data-root="../"> (path to this
   repo's root). The portfolio lives at the site root "/", served from the
   france5cogreen.github.io repo; this repo is published at /tools/.
   ============================================================ */
(function () {
  const body = document.body;
  const current = body.dataset.tool || "";
  const hub = body.dataset.root || "./";
  const home = "/";

  /* ---------- nav ---------- */
  const nav = document.createElement("header");
  nav.className = "nav scrolled";
  nav.innerHTML = `
    <div class="wrap">
      <a href="${home}" class="brand"><span class="dot"></span>francesco.di_rienzo<span class="cursor">_</span></a>
      <nav class="nav-links">
        <a href="${hub}"${current ? "" : ' class="active"'}><span class="idx">~/</span>tools</a>
        <a href="${home}"><span class="idx">↩</span>portfolio</a>
      </nav>
      <div class="nav-right">
        <a class="btn btn-cv" href="${home}#contact">Hire me</a>
        <button class="nav-burger" id="burger" aria-label="Menu"><span></span></button>
      </div>
    </div>`;
  body.prepend(nav);
  const mm = document.createElement("div");
  mm.className = "mobile-menu";
  mm.innerHTML = `<a href="${hub}"><span class="idx">~/</span>All tools</a>
    <a href="${home}"><span class="idx">↩</span>Portfolio</a>
    <a href="${home}#contact"><span class="idx">@</span>Hire me</a>`;
  nav.after(mm);
  nav.querySelector("#burger").addEventListener("click", () => mm.classList.toggle("open"));

  /* ---------- related tools ---------- */
  const rel = document.getElementById("related");
  if (rel && window.TOOLS) {
    const others = TOOLS.filter(t => t.slug !== current);
    rel.innerHTML = `<h2>// more free tools</h2><div class="tool-grid">${others.map(card).join("")}</div>`;
  }
  const grid = document.getElementById("tool-grid");
  if (grid && window.TOOLS) grid.innerHTML = TOOLS.map(card).join("");

  function card(t) {
    return `<a class="tool-card" href="${hub}${t.slug}/">
      <span class="ic">[${t.tag}]</span><h3>${t.name}</h3><p>${t.desc}</p></a>`;
  }

  /* ---------- footer ---------- */
  const ft = document.createElement("footer");
  ft.className = "footer";
  ft.style.position = "relative";
  ft.style.zIndex = "1";
  ft.innerHTML = `<div class="wrap">
      <span>© ${new Date().getFullYear()} Francesco Di Rienzo · Network &amp; Security Engineer</span>
      <div class="ft-links">
        <a href="${hub}">Tools</a>
        <a href="${home}">Portfolio</a>
        <a href="https://github.com/france5cogreen" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/francesco-di-rienzo" target="_blank" rel="noopener">LinkedIn</a>
      </div></div>`;
  body.append(ft);
})();

/* ---------- helpers shared by the tool scripts ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.append(ta); ta.select();
    try { document.execCommand("copy"); } catch {}
    ta.remove();
  }
  if (btn) {
    const old = btn.textContent;
    btn.textContent = "copied"; btn.classList.add("ok");
    setTimeout(() => { btn.textContent = old; btn.classList.remove("ok"); }, 1200);
  }
}

/* Any element with data-copy-from="#id" copies that element's value/text. */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-copy-from], [data-copy]");
  if (!b) return;
  const text = b.dataset.copy != null ? b.dataset.copy
    : (t => t.value != null ? t.value : t.textContent)($(b.dataset.copyFrom));
  copyText(text, b);
});

/* key/value table with per-row copy buttons; rows = [[label, value, highlight?]] */
function kvTable(rows) {
  return `<div class="kv">${rows.map(([k, v, hl]) =>
    `<div class="k">${esc(k)}</div><div class="v${hl ? " hl" : ""}"><span>${esc(v)}</span>` +
    `<button class="copy" data-copy="${esc(v)}">copy</button></div>`).join("")}</div>`;
}

/* ---------- IPv4 helpers (subnet, cidr-range, fortigate) ---------- */
const IP4 = {
  parse(s) {
    const m = String(s).trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!m) return null;
    const o = m.slice(1).map(Number);
    if (o.some(x => x > 255)) return null;
    return ((o[0] << 24) >>> 0) + (o[1] << 16) + (o[2] << 8) + o[3];
  },
  str(n) { return [24, 16, 8, 0].map(s => (n >>> s) & 255).join("."); },
  mask(p) { return p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0; },
  /* "a.b.c.d/nn" or "a.b.c.d/255.255.255.0" or "a.b.c.d mask" -> {ip, prefix} */
  parseCidr(s) {
    const m = String(s).trim().match(/^([\d.]+)\s*(?:\/\s*|\s+)([\d.]+)$/);
    if (!m) return null;
    const ip = IP4.parse(m[1]);
    if (ip == null) return null;
    let prefix;
    if (/^\d{1,2}$/.test(m[2])) prefix = Number(m[2]);
    else {
      const mk = IP4.parse(m[2]);
      if (mk == null) return null;
      prefix = IP4.maskToPrefix(mk);
    }
    if (prefix == null || prefix < 0 || prefix > 32) return null;
    return { ip, prefix };
  },
  maskToPrefix(mk) {
    const inv = (~mk) >>> 0;
    if ((inv & (inv + 1)) !== 0) return null; // not contiguous
    let p = 0; for (let i = 31; i >= 0; i--) { if ((mk >>> i) & 1) p++; else break; }
    return p;
  },
  /* minimal CIDR list covering [start, end] */
  rangeToCidrs(start, end) {
    const out = [];
    let cur = start;
    while (cur <= end) {
      let size = 32;
      while (size > 0) {
        const p = size - 1;
        const blk = 2 ** (32 - p);
        if (cur % blk !== 0 || cur + blk - 1 > end) break;
        size = p;
      }
      out.push({ ip: cur, prefix: size });
      cur += 2 ** (32 - size);
      if (cur > 0xFFFFFFFF) break;
    }
    return out;
  }
};
