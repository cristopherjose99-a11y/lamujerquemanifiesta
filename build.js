/* ══════════════════════════════════════════════════════════════════════════
   GENERADOR DEL SITIO

   Lee productos.config.js y escribe:
     · index.html            la landing del producto marcado como principal
     · <slug>/index.html     una landing completa por cada producto
     · productos.html        el catálogo con todos
     · artifact.html         la versión para previsualizar en Claude

   Se ejecuta con:   node build.js
   No tiene dependencias: solo Node.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const fs   = require('fs');
const path = require('path');

const PRODUCTOS = require('./productos.config.js');
const DOMINIO   = 'https://lamujerquemanifiesta.com';
const SOPORTE   = 'Emprendersinlimitess@gmail.com';
const MARCA     = 'La Mujer que Manifiesta';

const RESET   = fs.readFileSync('plantillas/reset.html',   'utf8').trim();
const ESTILOS = fs.readFileSync('plantillas/estilos.html', 'utf8').trim();

/* ── utilidades ───────────────────────────────────────────────────────── */

// Los textos del config pueden llevar HTML (<strong>, <em>, <br>): es tu
// propio archivo, así que se insertan tal cual.
const t = v => (v == null ? '' : String(v));

// Sólo para atributos, donde unas comillas sueltas romperían el HTML.
const attr = v => t(v).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const hay = v => Array.isArray(v) ? v.length > 0 : (v != null && v !== '');

// Un párrafo que empieza por @ se muestra destacado.
const parrafo = p => t(p).startsWith('@')
  ? `<p class="text-grafito font-medium">${t(p).slice(1)}</p>`
  : `<p>${t(p)}</p>`;

const dosDigitos = n => String(n).padStart(2, '0');

/* ── bloques de la página ─────────────────────────────────────────────── */

function barraUrgencia(p) {
  if (!hay(p.urgencia)) return '';
  return `
<div class="bg-oro text-grafito text-center font-semibold"
     style="padding-block:.6rem; padding-top:calc(.6rem + env(safe-area-inset-top, 0px));">
  <div class="wrap">
    <p class="text-[.72rem] sm:text-sm tracking-[.09em] uppercase leading-snug">${t(p.urgencia)}</p>
  </div>
</div>`;
}

function cabecera(p, base) {
  const compra = hay(p.checkout)
    ? `
      <a href="${attr(p.checkout)}" target="_blank" rel="noopener"
         class="btn-gold hidden sm:inline-flex items-center rounded-full font-bold uppercase tracking-[.1em] text-[.68rem] whitespace-nowrap"
         style="padding:.62rem 1.3rem; text-decoration:none;">Quiero mi kit</a>`
    : '';

  return `
<nav class="sticky z-40" aria-label="Principal"
     style="top:env(safe-area-inset-top, 0px); background:rgba(253,251,247,.9); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-bottom:1px solid var(--hairline);">
  <div class="wrap flex items-center justify-between gap-4" style="padding-block:.8rem;">

    <a href="${base}index.html" class="font-display leading-none shrink-0"
       style="font-size:clamp(.92rem,3.4vw,1.08rem); text-decoration:none; color:var(--fg);">${MARCA}</a>

    <div class="flex items-center gap-5 sm:gap-7 shrink-0">
      ${hay(p.incluye) ? `<a href="#incluye" class="hidden sm:inline text-[.72rem] uppercase tracking-[.16em] whitespace-nowrap"
         style="color:var(--fg-soft); text-decoration:none;">Qué incluye</a>` : ''}

      <a href="${base}productos.html" class="text-[.72rem] uppercase tracking-[.16em] whitespace-nowrap"
         style="color:var(--gold-deep); text-decoration:none; font-weight:600;">Productos</a>
${compra}
    </div>

  </div>
</nav>`;
}

function hero(p) {
  const h = p.hero || {};
  const po = p.portada || {};

  const insignias = hay(h.insignias) ? `
        <ul class="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[.74rem] uppercase tracking-[.14em]"
            style="color:var(--fg-soft);">
${h.insignias.map(i => `          <li class="flex items-center gap-2"><span aria-hidden="true" style="color:var(--gold-deep); font-size:.6em;">◆</span>${t(i)}</li>`).join('\n')}
        </ul>` : '';

  const cta = hay(p.checkout) ? `
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <a href="${attr(p.checkout)}" target="_blank" rel="noopener"
             class="btn-gold inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-[.1em] text-[.78rem] sm:text-[.82rem] text-center px-8 py-[1.1rem]">
            ${t(h.cta || ('Quiero mi kit por ' + t(p.precio)))}
          </a>
${hay(h.notaCta) ? `          <p class="text-[.78rem] leading-relaxed" style="color:var(--fg-soft);">${t(h.notaCta)}</p>` : ''}
        </div>` : '';

  return `
<header class="relative overflow-hidden">
  <div aria-hidden="true" class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[760px] max-w-[130%] rounded-full"
       style="background:radial-gradient(ellipse at center, rgba(212,175,55,.16), rgba(212,175,55,0) 68%);"></div>

  <div class="wrap relative" style="padding-block:clamp(2.75rem,7vw,5.25rem);">
    <div class="grid gap-x-14 gap-y-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">

      <div class="rise" style="min-width:0;">
        <p class="eyebrow mb-5">${t(p.categoria)}${hay(p.subtitulo) ? ' · ' + t(p.subtitulo) : ''}</p>

        <h1 class="font-display font-medium text-grafito leading-[1.08] tracking-[-.015em]"
            style="font-size:clamp(2.1rem,5.4vw,3.6rem);">
          ${t(h.titular || p.nombre).replace(/<em>/g, '<em class="not-italic relative whitespace-nowrap" style="color:var(--gold-deep);">')}
        </h1>

${hay(h.subtitular) ? `        <h2 class="mt-6 measure text-[1.0625rem] sm:text-xl leading-relaxed font-light"
            style="color:var(--fg-soft);">${t(h.subtitular)}</h2>` : ''}

        <hr class="rule my-8">
${cta}${insignias}
      </div>

      <div class="kit-stage flex justify-center lg:justify-end" style="min-width:0;">
        <div class="kit relative" style="width:min(100%,380px); aspect-ratio:1/1.08; max-width:100%;">

          <div class="plate absolute rounded-[10px]" style="border:1px solid var(--hairline); inset:14% -4% 26% 34%; transform:translateZ(-60px) rotate(7deg);"></div>
          <div class="plate absolute rounded-[10px]" style="border:1px solid var(--hairline); inset:26% 6% 12% 26%; transform:translateZ(-30px) rotate(3deg);"></div>

          <div class="book absolute rounded-[6px] overflow-hidden"
               style="inset:4% 22% 8% 2%; transform:translateZ(20px);">
            <div class="absolute inset-0 flex flex-col justify-between items-center text-center"
                 style="padding:clamp(1.25rem,4.5%,2rem) clamp(1rem,8%,1.6rem) clamp(1.25rem,5%,2rem) calc(13px + clamp(1rem,7%,1.5rem));">
              <div>
                <p class="eyebrow" style="font-size:.5rem; letter-spacing:.26em;">${t(po.arriba || p.categoria)}</p>
                <div class="mx-auto mt-3 mb-4" style="width:30px; height:1px; background:var(--gold-deep);"></div>
              </div>

              <div>
                <h3 class="font-display leading-[1.12] tracking-[-.01em]" style="font-size:clamp(1.35rem,5.2vw,1.85rem);">
                  ${t(po.titulo || p.nombre).replace(/<em>/g, '<em style="color:var(--gold-deep);">')}
                </h3>
${hay(po.bajo) ? `                <p class="mt-4 text-[.6rem] uppercase tracking-[.2em]" style="color:var(--fg-soft);">${t(po.bajo)}</p>` : ''}
              </div>

              <div class="text-[.56rem] uppercase tracking-[.18em] leading-relaxed" style="color:var(--fg-soft);">${t(po.pie || '')}</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</header>`;
}

function encabezadoSeccion(eyebrow, titulo, entrada) {
  return `    <div class="text-center">
${hay(eyebrow) ? `      <p class="eyebrow">${t(eyebrow)}</p>` : ''}
      <h2 class="mt-4 font-display font-medium leading-[1.14] tracking-[-.01em] mx-auto measure"
          style="font-size:clamp(1.75rem,4.2vw,2.6rem);">${t(titulo)}</h2>
${hay(entrada) ? `      <p class="mt-5 mx-auto measure leading-relaxed" style="color:var(--fg-soft);">${t(entrada)}</p>` : ''}
    </div>`;
}

function dolor(p) {
  const d = p.dolor;
  if (!d || !hay(d.puntos)) return '';
  return `
<section class="bg-lino">
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
${encabezadoSeccion(d.eyebrow, d.titulo)}

    <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
${d.puntos.map(x => `      <div class="quiet-card rounded-xl p-6" style="min-width:0;">
        <p class="leading-relaxed">${t(x).replace(/<strong>/g, '<strong class="font-semibold">')}</p>
      </div>`).join('\n')}
    </div>
${hay(d.cierre) ? `
    <p class="mt-12 mx-auto measure text-center font-display italic leading-relaxed"
       style="font-size:clamp(1.15rem,2.6vw,1.5rem);">${t(d.cierre)}</p>` : ''}
  </div>
</section>`;
}

function porque(p) {
  const q = p.porque;
  if (!q) return '';
  const pasos = hay(q.pasos) ? `
      <div class="card rounded-2xl" style="padding:clamp(1.75rem,4vw,2.75rem); min-width:0;">
${hay(q.cajaTitulo) ? `        <p class="eyebrow">${t(q.cajaTitulo)}</p>` : ''}
        <dl class="mt-7 space-y-6">
${q.pasos.map((s, i) => `${i ? '          <hr class="rule">\n' : ''}          <div class="flex gap-5 items-baseline">
            <dt class="num shrink-0" style="width:2.6rem;">${dosDigitos(i + 1)}</dt>
            <dd><strong class="font-semibold block">${t(s.titulo)}</strong><span style="color:var(--fg-soft);">${t(s.texto)}</span></dd>
          </div>`).join('\n')}
        </dl>
      </div>` : '';

  return `
<section>
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
    <div class="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div style="min-width:0;">
${hay(q.eyebrow) ? `        <p class="eyebrow">${t(q.eyebrow)}</p>` : ''}
        <h2 class="mt-4 font-display font-medium leading-[1.14] tracking-[-.01em]"
            style="font-size:clamp(1.75rem,4.2vw,2.6rem);">${t(q.titulo)}</h2>
        <div class="mt-7 space-y-5 measure leading-relaxed" style="color:var(--fg-soft);">
${(q.parrafos || []).map(x => '          ' + parrafo(x)).join('\n')}
        </div>
      </div>
${pasos}
    </div>
  </div>
</section>`;
}

function incluye(p) {
  const c = p.incluye;
  if (!c || !hay(c.piezas)) return '';
  return `
<section class="bg-lino" id="incluye">
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
${encabezadoSeccion(c.eyebrow, c.titulo, c.entrada)}

    <div class="mt-12 grid gap-6 md:grid-cols-3">
${c.piezas.map(z => `      <article class="card rounded-2xl flex flex-col" style="padding:clamp(1.5rem,3.5vw,2.1rem); min-width:0;">
${hay(z.etiqueta) ? `        <p class="eyebrow">${t(z.etiqueta)}</p>` : ''}
        <h3 class="mt-3 font-display text-2xl leading-snug">${t(z.titulo)}</h3>
        <p class="mt-4 leading-relaxed grow" style="color:var(--fg-soft);">${t(z.texto)}</p>
${hay(z.formato) ? `        <p class="mt-6 pt-5 text-[.72rem] uppercase tracking-[.16em]" style="border-top:1px solid var(--hairline); color:var(--gold-deep);">${t(z.formato)}</p>` : ''}
      </article>`).join('\n')}
    </div>
  </div>
</section>`;
}

function camino(p) {
  const c = p.camino;
  if (!c || !hay(c.etapas)) return '';
  return `
<section>
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
${encabezadoSeccion(c.eyebrow, c.titulo)}

    <ol class="mt-12 grid gap-6 md:grid-cols-3">
${c.etapas.map((e, i) => `      <li class="quiet-card rounded-2xl" style="padding:clamp(1.5rem,3.5vw,2rem); min-width:0;">
        <p class="num">${dosDigitos(i + 1)}</p>
        <p class="mt-4 eyebrow">${t(e.cuando)}</p>
        <h3 class="mt-2 font-display text-xl">${t(e.titulo)}</h3>
        <p class="mt-3 leading-relaxed" style="color:var(--fg-soft);">${t(e.texto)}</p>
      </li>`).join('\n')}
    </ol>
  </div>
</section>`;
}

function testimonios(p) {
  if (!hay(p.testimonios)) return '';
  return `
<section class="bg-lino">
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
${encabezadoSeccion('Lo que dicen', 'Mujeres que ya lo hicieron')}

    <div class="mt-12 grid gap-6 md:grid-cols-3">
${p.testimonios.map(x => `      <figure class="quiet-card rounded-2xl" style="padding:clamp(1.5rem,3.5vw,2rem); min-width:0;">
        <p class="font-display text-3xl leading-none" style="color:var(--gold-deep);">“</p>
        <blockquote class="mt-2 leading-relaxed">${t(x.texto)}</blockquote>
        <figcaption class="mt-5 pt-4 text-[.78rem]" style="border-top:1px solid rgba(42,36,33,.08); color:var(--fg-soft);">
          <strong class="font-semibold text-grafito block">${t(x.nombre)}</strong>${t(x.detalle || '')}
        </figcaption>
      </figure>`).join('\n')}
    </div>
  </div>
</section>`;
}

function primeraEdicion(p) {
  const e = p.primeraEdicion;
  if (!e || hay(p.testimonios)) return '';   // con testimonios reales, sobra
  return `
<section class="bg-lino">
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
    <div class="mx-auto" style="max-width:760px;">

      <div class="text-center">
${hay(e.eyebrow) ? `        <p class="eyebrow">${t(e.eyebrow)}</p>` : ''}
        <h2 class="mt-4 font-display font-medium leading-[1.14] tracking-[-.01em]"
            style="font-size:clamp(1.75rem,4.2vw,2.6rem);">${t(e.titulo)}</h2>
      </div>

      <div class="card rounded-2xl mt-10" style="padding:clamp(1.75rem,4.5vw,2.75rem);">
${hay(e.destacado) ? `        <p class="font-display italic leading-relaxed text-center"
           style="font-size:clamp(1.1rem,2.6vw,1.35rem);">${t(e.destacado)}</p>

        <hr class="rule my-7">` : ''}

        <div class="measure mx-auto space-y-5 leading-relaxed" style="color:var(--fg-soft);">
${(e.parrafos || []).map(x => '          ' + parrafo(x)).join('\n')}
        </div>
      </div>

    </div>
  </div>
</section>`;
}

function bonos(p) {
  const b = p.bonos;
  if (!b || !hay(b.lista)) return '';
  return `
<section>
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
${encabezadoSeccion(b.eyebrow, b.titulo)}

    <div class="mt-12 grid gap-6 md:grid-cols-3">
${b.lista.map((x, i) => `      <article class="card rounded-2xl" style="padding:clamp(1.5rem,3.5vw,2rem); min-width:0;">
        <div class="flex items-center justify-between gap-3">
          <p class="eyebrow">Bono ${dosDigitos(i + 1)}</p>
${hay(x.valor) ? `          <p class="text-[.78rem] font-semibold" style="color:var(--gold-deep);">Valor ${t(x.valor)}</p>` : ''}
        </div>
        <h3 class="mt-3 font-display text-xl leading-snug">${t(x.titulo)}</h3>
        <p class="mt-3 leading-relaxed" style="color:var(--fg-soft);">${t(x.texto)}</p>
      </article>`).join('\n')}
    </div>
  </div>
</section>`;
}

function oferta(p) {
  const o = p.oferta || {};
  const simbolo = t(p.precio).match(/^[^\d]*/)[0] || '';
  const numero  = t(p.precio).replace(/^[^\d]*/, '');

  const desglose = hay(o.desglose) ? `
        <ul class="space-y-3.5">
${o.desglose.map(x => `          <li class="flex items-baseline justify-between gap-4 text-[.95rem]">
            <span>${t(x.concepto)}</span>
            <span class="shrink-0 count" style="color:var(--fg-soft);">${t(x.valor)}</span>
          </li>`).join('\n')}
        </ul>

        <hr class="rule my-7">` : '';

  return `
<section class="bg-lino" id="oferta">
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
    <div class="mx-auto" style="max-width:720px;">
      <div class="text-center">
${hay(o.eyebrow) ? `        <p class="eyebrow">${t(o.eyebrow)}</p>` : ''}
        <h2 class="mt-4 font-display font-medium leading-[1.14] tracking-[-.01em]"
            style="font-size:clamp(1.75rem,4.2vw,2.6rem);">${t(o.titulo || ('Llévate ' + t(p.nombre) + ' hoy'))}</h2>
      </div>

      <div class="card rounded-[20px] mt-10" style="padding:clamp(1.75rem,4.5vw,3rem);">
${desglose}
        <div class="text-center">
${hay(o.valorTotal) ? `          <p class="text-[.8rem] uppercase tracking-[.16em]" style="color:var(--fg-soft);">
            Valor real <s class="count" style="text-decoration-thickness:1px;">${t(o.valorTotal)}</s>
          </p>` : ''}
          <p class="mt-3 font-display leading-none count" style="font-size:clamp(3.4rem,11vw,4.75rem);">
            <span style="font-size:.42em; vertical-align:.55em; color:var(--gold-deep);">${simbolo}</span>${numero}
${hay(p.moneda) ? `            <span class="font-sans font-light" style="font-size:.2em; letter-spacing:.14em; vertical-align:.7em; color:var(--fg-soft);">${t(p.moneda)}</span>` : ''}
          </p>
          <p class="mt-3 font-semibold" style="color:var(--gold-deep);">Pago único${hay(p.descuento) ? ' · ' + t(p.descuento) + ' de descuento' : ''}</p>
          <p class="mt-2 text-[.76rem]" style="color:var(--fg-soft);">Más los impuestos que correspondan a tu país.</p>
        </div>
${hay(p.horasOferta) ? `
        <div class="mt-8 rounded-xl text-center" style="background:rgba(253,251,247,.72); border:1px solid var(--hairline); padding:1.1rem 1rem;">
          <p class="text-[.7rem] uppercase tracking-[.18em]" style="color:var(--fg-soft);">El precio de lanzamiento termina en</p>
          <p id="countdown" class="mt-2 font-display count" style="font-size:clamp(1.6rem,6vw,2.1rem); letter-spacing:.02em;">
            <span aria-hidden="true">—</span>
          </p>
        </div>` : ''}
${hay(p.checkout) ? `
        <a href="${attr(p.checkout)}" target="_blank" rel="noopener"
           class="btn-gold mt-8 flex items-center justify-center rounded-full font-sans font-bold uppercase tracking-[.1em] text-center"
           style="font-size:clamp(.78rem,2.6vw,.9rem); padding:1.25rem 1.5rem;">${t(o.cta || ('Quiero mi kit por ' + t(p.precio)))}</a>` : ''}
${hay(o.notaCta) ? `
        <p class="mt-5 text-center text-[.76rem] leading-relaxed" style="color:var(--fg-soft);">${t(o.notaCta)}</p>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

function garantia(p) {
  const g = p.garantia;
  if (!g || !p.garantiaDias) return '';
  return `
<section>
  <div class="wrap" style="padding-block:clamp(3rem,7vw,4.5rem);">
    <div class="mx-auto flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left" style="max-width:820px;">
      <div class="shrink-0 grid place-items-center rounded-full"
           style="width:104px; height:104px; border:1px solid var(--hairline); background:linear-gradient(160deg,#FFFDF9,#F2E9DA);">
        <div class="text-center">
          <p class="font-display leading-none count" style="font-size:2.1rem; color:var(--gold-deep);">${p.garantiaDias}</p>
          <p class="text-[.56rem] uppercase tracking-[.16em] mt-1" style="color:var(--fg-soft);">días</p>
        </div>
      </div>
      <div style="min-width:0;">
        <h2 class="font-display font-medium" style="font-size:clamp(1.4rem,3.2vw,1.9rem);">${t(g.titulo)}</h2>
        <p class="mt-3 leading-relaxed" style="color:var(--fg-soft);">${t(g.texto)}</p>
      </div>
    </div>
  </div>
</section>`;
}

function paraQuien(p) {
  const q = p.paraQuien;
  if (!q || (!hay(q.si) && !hay(q.no))) return '';
  return `
<section class="bg-lino">
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
    <div class="grid gap-6 md:grid-cols-2 mx-auto" style="max-width:920px;">
      <div class="quiet-card rounded-2xl" style="padding:clamp(1.5rem,3.5vw,2.1rem); min-width:0;">
        <p class="eyebrow">Es para ti si</p>
        <ul class="mt-5 space-y-3.5">
${(q.si || []).map(x => `          <li class="flex gap-3"><span style="color:var(--gold-deep);">◆</span><span>${t(x)}</span></li>`).join('\n')}
        </ul>
      </div>
      <div class="quiet-card rounded-2xl" style="padding:clamp(1.5rem,3.5vw,2.1rem); min-width:0;">
        <p class="eyebrow" style="color:var(--fg-soft);">No es para ti si</p>
        <ul class="mt-5 space-y-3.5" style="color:var(--fg-soft);">
${(q.no || []).map(x => `          <li class="flex gap-3"><span>·</span><span>${t(x)}</span></li>`).join('\n')}
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

function faq(p) {
  if (!hay(p.faq)) return '';
  return `
<section>
  <div class="wrap" style="padding-block:clamp(3.5rem,8vw,5.5rem);">
    <div class="mx-auto" style="max-width:760px;">
${encabezadoSeccion('Dudas frecuentes', 'Lo que suelen preguntarnos')}

      <div class="mt-10" style="border-top:1px solid var(--hairline); border-bottom:1px solid var(--hairline);">
${p.faq.map(x => `        <details style="border-top:1px solid var(--hairline);">
          <summary class="flex items-start justify-between gap-5 py-5">
            <span class="font-medium leading-snug">${t(x.p)}</span>
            <span class="chev shrink-0 mt-1 font-display text-xl leading-none" style="color:var(--gold-deep);">+</span>
          </summary>
          <p class="pb-6 leading-relaxed" style="color:var(--fg-soft);">${t(x.r)}</p>
        </details>`).join('\n')}
      </div>
    </div>
  </div>
</section>`;
}

function cierre(p) {
  const c = p.cierre;
  if (!c) return '';
  return `
<section class="relative overflow-hidden" style="background:linear-gradient(180deg,#FAF6EE,#F2E9DA);">
  <div aria-hidden="true" class="pointer-events-none absolute -bottom-52 left-1/2 -translate-x-1/2 h-[480px] w-[720px] max-w-[130%] rounded-full"
       style="background:radial-gradient(ellipse at center, rgba(212,175,55,.2), rgba(212,175,55,0) 70%);"></div>

  <div class="wrap relative text-center" style="padding-block:clamp(4rem,9vw,6rem);">
${hay(c.eyebrow) ? `    <p class="eyebrow">${t(c.eyebrow)}</p>` : ''}
    <h2 class="mt-4 mx-auto font-display font-medium leading-[1.1] tracking-[-.015em]"
        style="font-size:clamp(1.9rem,5vw,3.1rem); max-width:22ch;">${t(c.titulo)}</h2>
${hay(c.texto) ? `    <p class="mt-6 mx-auto measure leading-relaxed" style="color:var(--fg-soft);">${t(c.texto)}</p>` : ''}
${hay(p.checkout) ? `
    <a href="${attr(p.checkout)}" target="_blank" rel="noopener"
       class="btn-gold mt-9 inline-flex items-center justify-center rounded-full font-sans font-bold uppercase tracking-[.1em]"
       style="font-size:clamp(.78rem,2.6vw,.88rem); padding:1.25rem 2.5rem;">${t(c.cta || 'Empezar hoy')}</a>` : ''}
${hay(c.nota) ? `    <p class="mt-5 text-[.76rem]" style="color:var(--fg-soft);">${t(c.nota)}</p>` : ''}
  </div>
</section>`;
}

function pie(p, base) {
  return `
<footer class="bg-crema" style="border-top:1px solid var(--hairline);">
  <div class="wrap" style="padding-block:2.75rem; padding-bottom:calc(2.75rem + 84px);">
    <div class="flex flex-col sm:flex-row gap-7 sm:items-end sm:justify-between">
      <div>
        <p class="font-display text-lg leading-tight">${MARCA}</p>
        <p class="mt-1 text-[.74rem] uppercase tracking-[.16em]" style="color:var(--fg-soft);">${t(p.categoria)}${hay(p.subtitulo) ? ' · ' + t(p.subtitulo) : ''}</p>
      </div>
      <div class="flex flex-col sm:items-end gap-2">
        <a href="${base}productos.html" class="text-[.74rem] uppercase tracking-[.16em]"
           style="color:var(--gold-deep); text-decoration:none;">Ver todos los productos →</a>
        <p class="text-[.74rem]" style="color:var(--fg-soft);">
          Soporte: <span class="select-all font-medium text-grafito">${SOPORTE}</span>
        </p>
      </div>
    </div>

    <hr class="rule my-7">

    <p class="text-[.72rem] leading-relaxed measure" style="color:var(--fg-soft);">
      Este producto es material educativo y de desarrollo personal. No constituye asesoría financiera,
      médica ni psicológica, y no sustituye el acompañamiento de un profesional. Los resultados dependen
      del trabajo individual de cada persona.
    </p>
    <p class="mt-4 text-[.72rem]" style="color:var(--fg-soft);">
      © <span class="count" id="year">2026</span> ${MARCA}. Todos los derechos reservados.
    </p>
  </div>
</footer>`;
}

function ctaMovil(p) {
  if (!hay(p.checkout)) return '';
  return `
<div class="fixed left-0 right-0 bottom-0 z-50 sm:hidden"
     style="background:rgba(253,251,247,.93); backdrop-filter:blur(10px); border-top:1px solid var(--hairline); padding:.7rem 16px; padding-bottom:calc(.7rem + env(safe-area-inset-bottom, 0px));">
  <a href="${attr(p.checkout)}" target="_blank" rel="noopener"
     class="btn-gold flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-[.08em] text-[.74rem]"
     style="padding:.95rem 1rem;">
    Quiero mi kit por ${t(p.precio)}
${hay(p.precioAntes) ? `    <span class="font-normal normal-case tracking-normal" style="opacity:.72;">(antes ${t(p.precioAntes)})</span>` : ''}
  </a>
</div>`;
}

function script(p) {
  const contador = hay(p.horasOferta) ? `
  /* Cuenta atrás por visitante: el plazo se guarda en su navegador, así que
     quien vuelve retoma donde lo dejó y quien llega nuevo empieza de cero.
     Al vencer arranca otro plazo: nunca se queda en 00 h 00 m 00 s. */
  (function () {
    var HORAS_DE_OFERTA = ${p.horasOferta};
    var CLAVE = 'oferta_${t(p.slug).replace(/[^a-z0-9]/g, '_')}';

    var el = document.getElementById('countdown');
    if (!el) return;

    var duracion = HORAS_DE_OFERTA * 3600000;
    var finEnMemoria = 0;

    function leerFin() {
      try { var v = parseInt(window.localStorage.getItem(CLAVE), 10); return isFinite(v) ? v : 0; }
      catch (e) { return finEnMemoria; }
    }
    function guardarFin(fin) {
      finEnMemoria = fin;
      try { window.localStorage.setItem(CLAVE, String(fin)); } catch (e) {}
    }
    function finVigente() {
      var ahora = Date.now();
      var fin = leerFin();
      if (!fin || fin <= ahora || fin - ahora > duracion) { fin = ahora + duracion; guardarFin(fin); }
      return fin;
    }
    function pad(n) { return String(n).padStart(2, '0'); }

    var fin = finVigente();

    function tick() {
      var restante = fin - Date.now();
      if (restante <= 0) { fin = finVigente(); restante = fin - Date.now(); }
      el.textContent = pad(Math.floor(restante / 3600000)) + ' h  ' +
                       pad(Math.floor((restante % 3600000) / 60000)) + ' m  ' +
                       pad(Math.floor((restante % 60000) / 1000)) + ' s';
    }

    tick();
    setInterval(tick, 1000);
  })();
` : '';

  return `
<script>
${contador}
  (function () {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  })();
</script>`;
}

/* ── composición ──────────────────────────────────────────────────────── */

function cuerpo(p, base) {
  return [
    barraUrgencia(p), cabecera(p, base), hero(p), dolor(p), porque(p),
    incluye(p), camino(p), testimonios(p), primeraEdicion(p), bonos(p),
    oferta(p), garantia(p), paraQuien(p), faq(p), cierre(p),
    pie(p, base), ctaMovil(p), script(p)
  ].filter(Boolean).join('\n');
}

function cabeza(p, url) {
  const seo = p.seo || {};
  const titulo = seo.titulo || `${t(p.nombre)} — ${t(p.subtitulo || p.categoria)}`;
  const desc   = seo.descripcion || t((p.catalogo || {}).descripcion || '');
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light">

<title>${attr(titulo)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${attr(url)}">

<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${attr(MARCA)}">
<meta property="og:url" content="${attr(url)}">
<meta property="og:title" content="${attr(titulo)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:image" content="${DOMINIO}/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="${attr(p.nombre)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(titulo)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${DOMINIO}/og-image.jpg">

<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23FDFBF7'/%3E%3Cpath d='M16 6l7 10-7 10-7-10z' fill='%23D4AF37'/%3E%3C/svg%3E">

${RESET}`;
}

function paginaCompleta(p, { base, url }) {
  return `<!doctype html>
<html lang="es">
<head>
${cabeza(p, url)}

${ESTILOS}
</head>
<body>
${cuerpo(p, base)}
</body>
</html>
`;
}

// Versión para el Artifact de Claude: sin doctype, head ni body.
function paginaArtifact(p) {
  const seo = p.seo || {};
  return `<title>${attr(p.nombre)}</title>

${ESTILOS}
${cuerpo(p, '')}
`;
}

/* ── catálogo ─────────────────────────────────────────────────────────── */

function catalogo(lista) {
  const tarjetas = lista.map(p => {
    const vivo = p.estado !== 'proximamente' && hay(p.checkout);
    const c = p.catalogo || {};
    const precio = (vivo && hay(p.precio)) ? `
        <p class="mt-5 flex items-baseline gap-2">
          <span class="font-display count" style="font-size:1.75rem;">${t(p.precio)}</span>
${hay(p.precioAntes) ? `          <s class="count text-[.85rem]" style="color:var(--fg-soft); text-decoration-thickness:1px;">${t(p.precioAntes)}</s>` : ''}
        </p>` : '';

    const boton = vivo ? `
        <a href="${t(p.slug)}/" class="btn-gold mt-5 flex items-center justify-center rounded-full font-bold uppercase tracking-[.1em] text-[.74rem]"
           style="padding:.95rem 1rem; text-decoration:none;">${t(c.boton || 'Ver más')}</a>` : '';

    return `      <article class="card rounded-2xl flex flex-col ${vivo ? 'is-live' : 'soon'}" style="padding:1.25rem; min-width:0;">
        <div class="cover">
          <div>
            <p class="eyebrow" style="font-size:.5rem; letter-spacing:.24em;">${t(p.categoria)}</p>
            <p class="mt-3 font-display leading-tight" style="font-size:1.15rem;">${t(p.subtitulo || p.nombre)}</p>
          </div>
        </div>
        <div class="mt-5 flex items-start justify-between gap-3">
          <h2 class="font-display leading-snug" style="font-size:1.3rem; min-width:0;">${t(p.nombre)}</h2>
          <span class="badge ${vivo ? 'badge-live' : 'badge-soon'} shrink-0">${vivo ? 'Disponible' : 'Pronto'}</span>
        </div>
        <p class="mt-3 leading-relaxed grow" style="color:var(--fg-soft); font-size:.92rem;">${t(c.descripcion || '')}</p>${precio}${boton}
      </article>`;
  }).join('\n');

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light">

<title>Productos — ${attr(MARCA)}</title>
<meta name="description" content="Todos los kits y recursos digitales de ${attr(MARCA)}.">
<link rel="canonical" href="${DOMINIO}/productos.html">

<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${attr(MARCA)}">
<meta property="og:url" content="${DOMINIO}/productos.html">
<meta property="og:title" content="Productos — ${attr(MARCA)}">
<meta property="og:description" content="Todos los kits y recursos digitales de ${attr(MARCA)}.">
<meta property="og:image" content="${DOMINIO}/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${DOMINIO}/og-image.jpg">

<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23FDFBF7'/%3E%3Cpath d='M16 6l7 10-7 10-7-10z' fill='%23D4AF37'/%3E%3C/svg%3E">

${RESET}

${ESTILOS}
<style>
  .cover {
    position:relative; aspect-ratio:4/3; border-radius:10px; overflow:hidden;
    background:
      linear-gradient(118deg, rgba(255,255,255,.5) 0%, transparent 36%),
      linear-gradient(160deg,#F3EADC 0%,#E8DED1 54%,#D8CBB8 100%);
    border:1px solid var(--hairline);
    display:grid; place-items:center; text-align:center; padding:1.25rem;
  }
  .cover::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(112deg, transparent 38%, rgba(212,175,55,.32) 50%, transparent 62%);
    background-size:280% 100%; animation:glint 7s ease-in-out infinite; pointer-events:none;
  }
  .card.is-live { transition:transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease; }
  .card.is-live:hover { transform:translateY(-4px); }
  .soon { opacity:.72; }
  .soon .cover { filter:grayscale(.35); }
  .badge {
    display:inline-flex; align-items:center; gap:.4rem;
    font-size:.6rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
    border-radius:999px; padding:.3rem .7rem;
  }
  .badge-live { background:var(--gold); color:#231E1A; }
  .badge-soon { background:rgba(42,36,33,.07); color:var(--fg-soft); }
</style>
</head>
<body>

<nav class="sticky z-40" aria-label="Principal"
     style="top:env(safe-area-inset-top, 0px); background:rgba(253,251,247,.9); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-bottom:1px solid var(--hairline);">
  <div class="wrap flex items-center justify-between gap-4" style="padding-block:.8rem;">
    <a href="index.html" class="font-display leading-none shrink-0"
       style="font-size:clamp(.92rem,3.4vw,1.08rem); text-decoration:none; color:var(--fg);">${MARCA}</a>
    <a href="index.html" class="text-[.72rem] uppercase tracking-[.16em] whitespace-nowrap"
       style="color:var(--gold-deep); text-decoration:none;">← Volver</a>
  </div>
</nav>

<section>
  <div class="wrap" style="padding-block:clamp(2.75rem,7vw,4.5rem);">
    <p class="eyebrow">Catálogo</p>
    <h1 class="mt-4 font-display font-medium leading-[1.1] tracking-[-.015em]"
        style="font-size:clamp(2rem,5vw,3.1rem);">Todo lo que tenemos para ti</h1>
    <p class="mt-5 measure leading-relaxed" style="color:var(--fg-soft);">
      Recursos digitales para reprogramar tu relación con el dinero, sostener tus proyectos
      y recuperar tu poder interior. Todos de acceso inmediato y pago único.
    </p>
  </div>
</section>

<section class="bg-lino">
  <div class="wrap" style="padding-block:clamp(3rem,7vw,4.5rem);">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
${tarjetas}
    </div>
  </div>
</section>

<footer style="border-top:1px solid var(--hairline);">
  <div class="wrap" style="padding-block:2.5rem;">
    <div class="flex flex-col sm:flex-row gap-6 sm:items-end sm:justify-between">
      <div>
        <p class="font-display text-lg leading-tight">${MARCA}</p>
        <p class="mt-1 text-[.74rem] uppercase tracking-[.16em]" style="color:var(--fg-soft);">Recursos digitales</p>
      </div>
      <p class="text-[.74rem]" style="color:var(--fg-soft);">
        Soporte: <span class="select-all font-medium" style="color:var(--fg);">${SOPORTE}</span>
      </p>
    </div>
    <hr class="rule my-6">
    <p class="text-[.72rem] leading-relaxed measure" style="color:var(--fg-soft);">
      Nuestros productos son material educativo y de desarrollo personal. No constituyen asesoría
      financiera, médica ni psicológica, y no sustituyen el acompañamiento de un profesional.
    </p>
    <p class="mt-3 text-[.72rem]" style="color:var(--fg-soft);">
      © <span class="count" id="year">2026</span> ${MARCA}.
    </p>
  </div>
</footer>

<script>
  (function () { var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); })();
</script>

</body>
</html>
`;
}

/* ── ejecución ────────────────────────────────────────────────────────── */

function comprobar(lista) {
  const problemas = [];
  const vistos = new Set();
  lista.forEach((p, i) => {
    const d = `producto ${i + 1}${p.nombre ? ' («' + p.nombre + '»)' : ''}`;
    if (!hay(p.slug))   problemas.push(`${d}: falta "slug".`);
    if (!hay(p.nombre)) problemas.push(`${d}: falta "nombre".`);
    if (hay(p.slug) && !/^[a-z0-9-]+$/.test(p.slug))
      problemas.push(`${d}: el slug "${p.slug}" solo admite minúsculas, números y guiones.`);
    if (vistos.has(p.slug)) problemas.push(`${d}: el slug "${p.slug}" está repetido.`);
    vistos.add(p.slug);
    if (p.estado !== 'proximamente' && !hay(p.checkout))
      problemas.push(`${d}: está como disponible pero no tiene "checkout". Ponle el enlace de pago o márcalo estado: "proximamente".`);
  });
  const principales = lista.filter(p => p.principal);
  if (principales.length > 1) problemas.push('Hay más de un producto con principal: true. Solo puede haber uno.');
  return problemas;
}

const problemas = comprobar(PRODUCTOS);
if (problemas.length) {
  console.error('\n  No se pudo generar el sitio:\n');
  problemas.forEach(x => console.error('    · ' + x));
  console.error('\n  Corrige productos.config.js y vuelve a ejecutar node build.js\n');
  process.exit(1);
}

const principal = PRODUCTOS.find(p => p.principal) || PRODUCTOS[0];
const escritos = [];

function escribir(destino, contenido) {
  const dir = path.dirname(destino);
  if (dir !== '.' && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(destino, contenido);
  escritos.push(`${destino}  (${(Buffer.byteLength(contenido) / 1024).toFixed(1)} KB)`);
}

// Portada
escribir('index.html', paginaCompleta(principal, { base: '', url: DOMINIO + '/' }));
escribir('artifact.html', paginaArtifact(principal));

// Una landing por producto
PRODUCTOS.forEach(p => {
  escribir(path.join(p.slug, 'index.html'),
           paginaCompleta(p, { base: '../', url: `${DOMINIO}/${p.slug}/` }));
});

// Catálogo
escribir('productos.html', catalogo(PRODUCTOS));

console.log('\n  Sitio generado desde productos.config.js\n');
escritos.forEach(x => console.log('    ' + x));
console.log(`\n  ${PRODUCTOS.length} producto(s). Portada: «${principal.nombre}».\n`);
