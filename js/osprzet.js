/* ============================================================
   INVERSIS — osprzęt do kotłowni
   Variant selector (button grid) + dynamic spec table.
   Mirrors the boiler pages (js/main.js) but driven by a
   per-page product key (body[data-page]) and a generic
   spec map, so each product shows only its relevant rows.

   Markup per page:
     <body data-page="magazyn|suw|odgazowanie">
     .power-grid                      ← buttons injected here
     [data-stat="..."]                ← quick stats (hero)
     [data-spec="..."]                ← spec table cells
     [data-product-img]               ← hero image (optional, swaps per variant)
   ============================================================ */
(function () {
  const OSPRZET = {
    magazyn: [
      { id: '3',  label: '3 m³',  img: 'assets/osprzet-magazyn-paliwa-3.png',
        s: { pojemnosc: '3000 l',  length: '3000 mm', width: '2438 mm', height: '2591 mm', weightT: '1200 kg', weightO: '3800 kg' } },
      { id: '10', label: '10 m³', img: 'assets/osprzet-magazyn-paliwa.png',
        s: { pojemnosc: '10 000 l', length: '6058 mm', width: '2438 mm', height: '2591 mm', weightT: '5500 kg', weightO: '14 100 kg' } },
      { id: '16', label: '16 m³', img: 'assets/osprzet-magazyn-paliwa.png',
        s: { pojemnosc: '16 000 l', length: '6058 mm', width: '2438 mm', height: '2950 mm', weightT: '6500 kg', weightO: '21 000 kg' } },
    ],
    suw: [
      { id: '3', label: '3 m³', img: 'assets/osprzet-suw-mala.png',
        s: { butle: '2 × 75 l',  sol: '100 l', length: '1500 mm', width: '600 mm',  height: '1650 mm', weightT: '250 kg',  weightO: '650 kg',  electric: '230 V' } },
      { id: '6', label: '6 m³', img: 'assets/osprzet-suw-duza.png',
        s: { butle: '2 × 200 l', sol: '350 l', length: '3000 mm', width: '2438 mm', height: '2591 mm', weightT: '1000 kg', weightO: '2000 kg', electric: '230/400 V' } },
    ],
    odgazowanie: [
      { id: '2900', label: '2900 l/h', img: 'assets/osprzet-modul-odgazowania.png',
        s: { wydajnosc: '2900 l/h', length: '6150 mm', width: '2438 mm', height: '2900 mm', weightT: '4300 kg', weightO: '5500 kg', electric: '5 kW' } },
    ],
  };

  function setText(sel, v) {
    document.querySelectorAll(sel).forEach(el => { if (v != null) el.textContent = v; });
  }

  const getLang = () => (window.getLang && window.getLang()) || localStorage.getItem('inversis_lang') || 'pl';

  const ENQ = {
    pl: { subj: 'Zapytanie ofertowe', variant: 'Wariant', intro: 'Dzień dobry,\n\nproszę o ofertę na poniższą konfigurację:', url: 'Strona', regards: 'Pozdrawiam,' },
    en: { subj: 'Request for quotation', variant: 'Variant', intro: 'Hello,\n\nplease send a quote for the configuration below:', url: 'Page', regards: 'Best regards,' },
    uk: { subj: 'Запит на пропозицію', variant: 'Варіант', intro: 'Доброго дня,\n\nпрошу надати комерційну пропозицію щодо наведеної нижче конфігурації:', url: 'Сторінка', regards: 'З повагою,' },
    hy: { subj: 'Հարցում գնառաջարկի', variant: 'Տարբերակ', intro: 'Բարև Ձեզ,\n\nխնդրում եմ տրամադրել առաջարկ ստորև բերված կազմաձևման համար․', url: 'Էջ', regards: 'Հարգանքով,' }
  };

  function updateEnquiry() {
    const link = document.querySelector('a[data-enquiry]');
    if (!link) return;
    const t = ENQ[getLang()] || ENQ.pl;
    const h1 = document.querySelector('h1');
    const product = ((h1 && (h1.innerText || h1.textContent)) || document.title || '').replace(/\s+/g, ' ').trim();
    const variant = (document.querySelector('.power-btn.active') || {}).textContent;
    const rows = [...document.querySelectorAll('.spec-row')].map(r => {
      const k = r.querySelector('.spec-label');
      const val = r.querySelector('.spec-value');
      return (k && val) ? `• ${k.textContent.trim()}: ${val.textContent.trim()}` : null;
    }).filter(Boolean);
    const head = variant ? `${product} — ${t.variant}: ${variant.trim()}` : product;
    const subject = `${t.subj}: ${product}${variant ? ' (' + variant.trim() + ')' : ''}`;
    const body = `${t.intro}\n\n${head}\n${rows.join('\n')}\n\n${t.url}: ${location.href}\n\n${t.regards}`;
    link.setAttribute('href', `mailto:contact@inversis-group.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  function renderSpec(v) {
    window.__currentOsprzet = v;
    const s = v.s;
    const dim = (s.length && s.width && s.height)
      ? `${s.length.replace(/ mm$/,'')} × ${s.width.replace(/ mm$/,'')} × ${s.height.replace(/ mm$/,'')} mm` : null;

    // Mirror every spec value into both the spec table ([data-spec])
    // and the hero quick-stats ([data-stat]) so each page can pick
    // whichever four stats it wants to surface.
    Object.keys(s).forEach(k => {
      setText(`[data-spec="${k}"]`, s[k]);
      setText(`[data-stat="${k}"]`, s[k]);
    });
    const primary = s.pojemnosc || s.wydajnosc || s.butle;
    setText('[data-stat="primary"]', primary);
    setText('[data-spec="primary"]', primary);
    if (dim) {
      setText('[data-spec="dimensions"]', dim);
      setText('[data-stat="dimensions"]', dim);
    }

    // hero image swap
    if (v.img) {
      document.querySelectorAll('[data-product-img]').forEach(img => {
        if (img.getAttribute('src') !== v.img) img.setAttribute('src', v.img);
      });
    }

    updateEnquiry();
  }

  function initButtons(variants) {
    const grid = document.querySelector('.power-grid');
    if (!grid) return;
    grid.innerHTML = '';
    variants.forEach((v, i) => {
      const btn = document.createElement('button');
      btn.className = 'power-btn' + (i === 0 ? ' active' : '');
      btn.textContent = v.label;
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.power-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSpec(v);
      });
      grid.appendChild(btn);
    });
    renderSpec(variants[0]);
  }

  function initAccordion() {
    document.querySelectorAll('.spec-section').forEach(sec => {
      const head = sec.querySelector('.spec-section-head');
      if (head) head.addEventListener('click', () => sec.classList.toggle('collapsed'));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    const key = document.body.dataset.page;
    if (OSPRZET[key]) initButtons(OSPRZET[key]);
    window.addEventListener('langchange', updateEnquiry);
  });
})();
