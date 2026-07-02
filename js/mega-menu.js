/* ============================================================
   INVERSIS — Mega-menu (wariant 1c)
   Wzbogaca istniejącą .main-nav (inline w index.html oraz
   wstrzykiwaną przez inversis-chrome.js na podstronach):
     • desktop  → hover rozwija dropdown (granat + lista + „Zobacz wszystko")
     • mobile   → hamburger + rozwijana harmonijka
   Zachowanie A: klik w nazwę kategorii → jej podstrona.
   Jedno źródło produktów (CATS). Tłumaczenia: linki dostają
   data-pl/data-en, a js/i18n.js dokłada uk/hy ze słownika.
   ============================================================ */
(function () {
  const ARR  = '<svg viewBox="0 0 24 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h22M17 1l6 5-6 5"/></svg>';
  const CHEV = '<svg class="mm-chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l4 4 4-4"/></svg>';

  const CATS = {
    'cieplownictwo.html': {
      pl: 'Ciepłownictwo i para', en: 'District heating & steam',
      tagPl: 'Kotłownie kontenerowe i osprzęt dla przemysłu.',
      tagEn: 'Containerized boiler plants and equipment for industry.',
      items: [
        { pl: 'Kotłownie mobilne parowe', en: 'Mobile steam boiler plants', href: 'steam-boilers.html' },
        { pl: 'Kotłownie mobilne wodne',  en: 'Mobile water boiler plants', href: 'water-boilers.html' },
        { pl: 'Osprzęt do kotłowni',      en: 'Boiler-room equipment',      href: 'osprzet-do-kotlowni.html' },
      ]
    },
    'energetyka.html': {
      pl: 'Energetyka', en: 'Energy',
      tagPl: 'Modułowe systemy energetyczne — magazynowanie i transformacja.',
      tagEn: 'Modular energy systems — storage and transformation.',
      items: [
        { pl: 'Magazyny energii (BESS)',                 en: 'Energy storage (BESS)',            href: 'magazyny-energii-bess.html' },
        { pl: 'Stacje transformatorowe z BESS',          en: 'Transformer stations with BESS',   href: 'stacje-transformatorowe-bess.html' },
        { pl: 'Autonomiczne moduły zasilania',           en: 'Autonomous power modules',         href: 'autonomiczne-moduly-zasilania.html' },
        { pl: 'Stacje transformatorowe i rozdzielnie',   en: 'Transformer stations & switchgear', href: 'stacje-transformatorowe-rozdzielnie.html' },
      ]
    },
    'infrastruktura-it.html': {
      pl: 'Infrastruktura IT', en: 'IT Infrastructure',
      tagPl: 'Kontenerowe środowiska IT — gotowe i redundantne.',
      tagEn: 'Containerized IT environments — ready and redundant.',
      items: [
        { pl: 'Kontenerowe data center',        en: 'Containerized data centers', href: 'kontenerowe-data-center.html' },
        { pl: 'Edge data center',               en: 'Edge data centers',          href: 'edge-data-center.html' },
        { pl: 'Moduły zasilania i chłodzenia',  en: 'Power & cooling modules',    href: 'moduly-zasilania-i-chlodzenia.html' },
      ]
    }
  };
  const SEE_PL = 'Zobacz wszystko', SEE_EN = 'See all';
  const base = h => (h || '').split('/').pop();

  /* ---------- desktop: enhance nav in place ---------- */
  function enhanceNav(nav) {
    if (nav.dataset.mmReady) return;
    nav.dataset.mmReady = '1';
    [...nav.querySelectorAll(':scope > a[href]')].forEach(a => {
      const cat = CATS[base(a.getAttribute('href'))];
      const item = document.createElement('div');
      item.className = 'nav-item';
      a.parentNode.insertBefore(item, a);
      item.appendChild(a);
      if (!cat) return;                       // plain link (Produkcja, Kontakt)
      item.insertAdjacentHTML('beforeend', CHEV);   // chevron obok linku (poza [data-pl], przetrwa applyLang)
      const list = cat.items.map(i =>
        `<a href="${i.href}" data-pl="${i.pl}" data-en="${i.en}">${i.pl}${ARR}</a>`).join('');
      const dd = document.createElement('div');
      dd.className = 'mm-dd';
      dd.innerHTML = list;
      item.appendChild(dd);
    });
    wireDesktop(nav);
  }

  function wireDesktop(nav) {
    const items = [...nav.querySelectorAll('.nav-item')].filter(n => n.querySelector('.mm-dd'));
    let t;
    items.forEach(n => {
      n.addEventListener('mouseenter', () => {
        clearTimeout(t);
        items.forEach(x => x !== n && x.classList.remove('open'));
        n.classList.add('open');
        const dd = n.querySelector('.mm-dd');
        if (dd) {                              // wyrównanie do lewej, a przy prawej krawędzi — do prawej
          dd.style.left = '0'; dd.style.right = 'auto';
          const r = dd.getBoundingClientRect(), pad = 12;
          if (r.right > window.innerWidth - pad) { dd.style.left = 'auto'; dd.style.right = '0'; }
        }
      });
      n.addEventListener('mouseleave', () => { t = setTimeout(() => n.classList.remove('open'), 130); });
    });
  }

  /* ---------- mobile: burger + drawer ---------- */
  function buildMobile(header) {
    const actions = header.querySelector('.header-actions') || header.querySelector('.header-inner');
    if (!actions || actions.querySelector('.mm-burger')) return;
    const burger = document.createElement('button');
    burger.className = 'mm-burger'; burger.setAttribute('aria-label', 'Menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    actions.appendChild(burger);

    const rows = [...header.querySelectorAll('.main-nav .nav-item > a[href]')].map(a => {
      const href = a.getAttribute('href'), cat = CATS[base(href)];
      const label = a.dataset.pl || a.textContent.trim();
      const en = a.dataset.en || label;
      if (!cat) return `<div class="mm-mitem"><a class="mm-mrow" href="${href}" data-pl="${label}" data-en="${en}">${label}</a></div>`;
      const sub = cat.items.map(i => `<a href="${i.href}" data-pl="${i.pl}" data-en="${i.en}">${i.pl}${ARR}</a>`).join('');
      return `<div class="mm-mitem"><button class="mm-mrow" type="button"><span data-pl="${cat.pl}" data-en="${cat.en}">${cat.pl}</span>${CHEV}</button>
        <div class="mm-msub"><div class="mm-msub__inner">${sub}</div></div></div>`;
    }).join('');

    const backdrop = document.createElement('div'); backdrop.className = 'mm-backdrop';
    const drawer = document.createElement('div'); drawer.className = 'mm-drawer';
    drawer.innerHTML = `<div class="mm-drawer__head"><span class="mm-drawer__logo">INVERSIS</span><button class="mm-drawer__close" aria-label="Zamknij">&times;</button></div><nav>${rows}</nav>`;
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    const open = () => { drawer.classList.add('open'); backdrop.classList.add('open'); burger.classList.add('x'); document.body.style.overflow = 'hidden'; };
    const close = () => { drawer.classList.remove('open'); backdrop.classList.remove('open'); burger.classList.remove('x'); document.body.style.overflow = ''; };
    burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
    backdrop.addEventListener('click', close);
    drawer.querySelector('.mm-drawer__close').addEventListener('click', close);
    drawer.querySelectorAll('.mm-mitem > .mm-mrow').forEach(row => {
      if (row.tagName !== 'BUTTON') return;
      row.addEventListener('click', () => {
        const it = row.parentNode, was = it.classList.contains('open');
        drawer.querySelectorAll('.mm-mitem').forEach(x => x.classList.remove('open'));
        if (!was) it.classList.add('open');
      });
    });
    drawer.querySelectorAll('a[href]').forEach(a => a.addEventListener('click', close));
  }

  /* ---------- init (retry until chrome.js has injected header) ---------- */
  let tries = 0;
  function init() {
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');
    if (!nav || !header) { if (tries++ < 40) return void requestAnimationFrame(init); return; }
    enhanceNav(nav);
    buildMobile(header);
    if (window.applyLang && window.getLang) window.applyLang(window.getLang());  // przetłumacz wstrzyknięte linki
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
