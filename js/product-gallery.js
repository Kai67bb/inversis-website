/* ============================================================
   INVERSIS — Galeria produktu
   Przycisk „Zobacz galerię produktu" + rozwijana galeria + lightbox,
   na podstawie window.INVERSIS_GALLERY:

     window.INVERSIS_GALLERY = [
       { src: 'assets/gallery/foo.png', pl: 'Podpis', en: 'Caption', cap: '190 kW' },
       ...
     ];

   • cap (opcjonalne) — powiązanie zdjęcia z wariantem z „Wybierz moc".
     Gdy przynajmniej jedno zdjęcie ma cap, galeria pokazuje TYLKO zdjęcia
     odpowiadające aktywnemu przyciskowi .power-btn. Jeśli dla danej mocy
     nie ma zdjęć — cała sekcja się chowa.
   • Bez cap — zachowanie klasyczne (wszystkie zdjęcia zawsze widoczne).

   Wstawia się między .product-bottom a .coop-process.
   ============================================================ */
(function () {
  const PHOTOS = Array.isArray(window.INVERSIS_GALLERY) ? window.INVERSIS_GALLERY.filter(p => p && p.src) : [];
  if (!PHOTOS.length) return;

  const CAP_MODE = !!document.querySelector('.power-grid');
  const norm = (s) => (s || '').toString().toLowerCase().replace(/\s+/g, '').replace(/³/g, '3');
  // wyciąga token mocy z podpisu, np. "Kotłownia wodna 190 kW" → "190 kW"
  const extractCap = (s) => {
    const m = (s || '').match(/(\d[\d\s]*\s*(?:kW|kg\/h|m³|m3))/i);
    return m ? m[1] : '';
  };
  const capOf = (p) => p.cap || extractCap(p.pl) || extractCap(p.en);

  const L = {
    pl: { eyebrow: 'Dokumentacja fotograficzna', label: 'Zobacz galerię produktu', labelOpen: 'Galeria produktu', zoom: 'Powiększ', unit: (n) => n === 1 ? '1 zdjęcie' : (n < 5 ? n + ' zdjęcia' : n + ' zdjęć') },
    en: { eyebrow: 'Photo documentation', label: 'View product gallery', labelOpen: 'Product gallery', zoom: 'Zoom', unit: (n) => n === 1 ? '1 photo' : n + ' photos' },
    uk: { eyebrow: 'Фотодокументація', label: 'Дивитися галерею продукту', labelOpen: 'Галерея продукту', zoom: 'Збільшити', unit: (n) => n + ' фото' },
    hy: { eyebrow: 'Լուսանկարներ', label: 'Դիտել պատկերասրահը', labelOpen: 'Ապրանքի պատկերասրահ', zoom: 'Խոշորացնել', unit: (n) => n + ' լուսանկար' }
  };
  const lang = () => { const l = document.documentElement.lang; return l || (window.getLang && window.getLang()) || 'pl'; };
  const t = () => L[lang()] || L.pl;

  // Tłumaczenie nazw produktów wg przedrostka (zachowuje moc/pojemność z podpisu).
  // Dzięki temu podpisy działają w PL/EN/UA/AM bez ręcznego uzupełniania wpisów.
  const PRODUCTS = [
    { pl: 'Kotłownia wodna',          en: 'Water boiler plant',      uk: 'Водогрійна котельня',   hy: 'Ջրատաքացման կաթսայատուն' },
    { pl: 'Kotłownia parowa',         en: 'Steam boiler plant',      uk: 'Парова котельня',       hy: 'Գոլորշու կաթսայատուն' },
    { pl: 'Magazyn paliwa',           en: 'Fuel storage',            uk: 'Паливне сховище',       hy: 'Վառելիքի պահեստ' },
    { pl: 'Stacja uzdatniania wody',  en: 'Water treatment station', uk: 'Станція водопідготовки', hy: 'Ջրի մշակման կայան' },
    { pl: 'Moduł odgazowania',        en: 'Deaeration module',       uk: 'Модуль деаерації',      hy: 'Դեաերացիայի մոդուль' }
  ];
  const cap = (p) => {
    const lg = lang();
    const base = p.pl || p.en || '';
    if (lg === 'pl') return base;
    // dopasuj przedrostek produktu i przetłumacz, doklejając moc/pojemność
    for (const prod of PRODUCTS) {
      if (base.indexOf(prod.pl) === 0) {
        const rest = base.slice(prod.pl.length); // np. " 190 kW"
        return (prod[lg] || prod.en || prod.pl) + rest;
      }
    }
    return (lg === 'en' && p.en) ? p.en : base;
  };

  const ICON_IMG = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="M21 15l-5-5L5 21"/></svg>';
  const ICON_CHEV = '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';
  const ICON_ZOOM = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>';

  let VISIBLE = PHOTOS.slice();   // aktualnie widoczne zdjęcia (po filtrze mocy)
  let current = 0;                // indeks w VISIBLE
  let sec, lb;

  function selectedCap() {
    const btn = document.querySelector('.power-btn.active') || document.querySelector('.power-btn');
    return btn ? btn.textContent : null;
  }
  function computeVisible() {
    if (!CAP_MODE) return PHOTOS.slice();
    const sc = norm(selectedCap());
    if (!sc) return PHOTOS.slice();
    const matched = PHOTOS.filter(p => norm(capOf(p)) === sc);
    // zdjęcia bez rozpoznanej mocy = „wspólne" — pokazujemy zawsze
    const shared = PHOTOS.filter(p => !norm(capOf(p)));
    return matched.concat(shared);
  }

  function build() {
    const anchor = document.querySelector('.coop-process') || document.querySelector('.product-bottom');
    if (!anchor || document.querySelector('.pgal')) return;

    sec = document.createElement('section');
    sec.className = 'pgal';
    sec.innerHTML = `
      <button class="pgal__btn" type="button" aria-expanded="false">
        <span class="pgal__ic">${ICON_IMG}</span>
        <span class="pgal__txt">
          <span class="pgal__eyebrow"></span>
          <span class="pgal__label"></span>
        </span>
        <span class="pgal__count"></span>
        <span class="pgal__chev">${ICON_CHEV}</span>
      </button>
      <div class="pgal__reveal"><div class="pgal__inner">
        <div class="pgal__panel">
          <div class="pgal__main">
            <img alt="">
            <span class="pgal__cap"></span>
            <span class="pgal__zoom">${ICON_ZOOM}<span class="pgal__zoomtxt"></span></span>
          </div>
          <div class="pgal__thumbs"></div>
        </div>
      </div></div>`;

    if (anchor.classList.contains('coop-process')) anchor.parentNode.insertBefore(sec, anchor);
    else anchor.parentNode.insertBefore(sec, anchor.nextSibling);

    const btn = sec.querySelector('.pgal__btn');
    btn.addEventListener('click', () => {
      const open = sec.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      applyText();
    });
    sec.querySelector('.pgal__main').addEventListener('click', () => openLightbox(current));

    buildLightbox();
    refilter();

    // re-apply na zmianę języka
    if (window.applyLang && !window.applyLang.__pgal) {
      const orig = window.applyLang;
      window.applyLang = function () { const r = orig.apply(this, arguments); applyText(); renderThumbs(); return r; };
      window.applyLang.__pgal = true;
    }
    // reakcja na zmianę wybranej mocy
    if (CAP_MODE) watchPower();
  }

  function renderThumbs() {
    if (!sec) return;
    const thumbs = sec.querySelector('.pgal__thumbs');
    thumbs.innerHTML = '';
    VISIBLE.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'pgal__thumb' + (i === current ? ' on' : '');
      b.innerHTML = `<img src="${p.src}" alt="">`;
      b.addEventListener('click', () => select(i));
      thumbs.appendChild(b);
    });
  }

  // pełne przeliczenie widocznych zdjęć (po zmianie mocy / na starcie)
  function refilter() {
    if (!sec) return;
    VISIBLE = computeVisible();
    if (!VISIBLE.length) {           // brak zdjęć dla tej mocy → chowamy całą sekcję
      sec.style.display = 'none';
      sec.classList.remove('open');
      return;
    }
    sec.style.display = '';
    current = 0;
    renderThumbs();
    paintMain();
    applyText();
  }

  function select(i) {
    if (i < 0 || i >= VISIBLE.length) return;
    current = i;
    paintMain();
    if (sec) sec.querySelectorAll('.pgal__thumb').forEach((el, k) => el.classList.toggle('on', k === i));
  }

  function paintMain() {
    if (!sec || !VISIBLE.length) return;
    const p = VISIBLE[current];
    sec.querySelector('.pgal__main img').src = p.src;
    sec.querySelector('.pgal__cap').textContent = cap(p);
    syncLightboxText();
  }

  function applyText() {
    if (!sec || !VISIBLE.length) return;
    const tr = t(), open = sec.classList.contains('open');
    sec.querySelector('.pgal__eyebrow').textContent = tr.eyebrow;
    sec.querySelector('.pgal__label').textContent = open ? tr.labelOpen : tr.label;
    sec.querySelector('.pgal__count').textContent = tr.unit(VISIBLE.length);
    sec.querySelector('.pgal__zoomtxt').textContent = tr.zoom;
    sec.querySelector('.pgal__cap').textContent = cap(VISIBLE[current]);
    syncLightboxText();
  }

  /* ---------- reakcja na „Wybierz moc" ---------- */
  function watchPower() {
    let rt;
    const trigger = () => { clearTimeout(rt); rt = setTimeout(refilter, 0); };
    document.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('.power-btn')) trigger(); });
    const grid = document.querySelector('.power-grid');
    if (grid && window.MutationObserver) {
      new MutationObserver(trigger).observe(grid, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }
  }

  /* ---------- lightbox ---------- */
  function buildLightbox() {
    if (document.querySelector('.pgal-lb')) { lb = document.querySelector('.pgal-lb'); return; }
    lb = document.createElement('div');
    lb.className = 'pgal-lb';
    lb.innerHTML = `
      <button class="pgal-lb__nav prev" aria-label="Poprzednie"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
      <div class="pgal-lb__stage">
        <button class="pgal-lb__x" aria-label="Zamknij">&times;</button>
        <img class="pgal-lb__img" alt="">
        <div class="pgal-lb__count"></div>
        <div class="pgal-lb__cap"></div>
      </div>
      <button class="pgal-lb__nav next" aria-label="Następne"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>`;
    document.body.appendChild(lb);
    lb.querySelector('.pgal-lb__x').addEventListener('click', closeLightbox);
    lb.querySelector('.pgal-lb__nav.prev').addEventListener('click', () => step(-1));
    lb.querySelector('.pgal-lb__nav.next').addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }
  function openLightbox(i) { current = i; syncLightboxText(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLightbox() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function step(d) { if (!VISIBLE.length) return; current = (current + d + VISIBLE.length) % VISIBLE.length; select(current); syncLightboxText(); }
  function syncLightboxText() {
    if (!lb || !VISIBLE.length) return;
    const p = VISIBLE[current];
    lb.querySelector('.pgal-lb__img').src = p.src;
    lb.querySelector('.pgal-lb__cap').textContent = cap(p);
    lb.querySelector('.pgal-lb__count').textContent = (current + 1) + ' / ' + VISIBLE.length;
    lb.querySelectorAll('.pgal-lb__nav').forEach(n => n.style.display = VISIBLE.length > 1 ? '' : 'none');
  }

  /* ---------- init (retry aż sekcje i przyciski mocy istnieją) ---------- */
  let tries = 0;
  function init() {
    const ready = document.querySelector('.coop-process') || document.querySelector('.product-bottom');
    if (ready) {
      build();
      // przyciski mocy bywają wstrzykiwane asynchronicznie — dołóż jeszcze kilka przeliczeń
      if (CAP_MODE) { let n = 0; const iv = setInterval(() => { refilter(); if (++n >= 6) clearInterval(iv); }, 250); }
      return;
    }
    if (tries++ < 40) requestAnimationFrame(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
