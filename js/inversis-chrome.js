/* ============================================================
   INVERSIS — header & footer renderer
   Each page provides:
     <div data-inversis-header data-active="energetyka"></div>
     <div data-inversis-footer></div>

   Markup mirrors the published / restyled home (index.html):
   static .header-inner / .main-nav header and the simple
   3-column .footer-inner footer. Styling lives in
   css/product-restyle.css (which mirrors css/home-restyle.css).

   Page-unique content (hero, sections, cards) lives inline in
   the page HTML so it remains directly editable.

   Translation: nav labels carry data-pl/data-en pairs and the
   shared js/i18n.js applies the persisted language after render.
   ============================================================ */

(function () {
  // Top nav — identical to the home page (index.html).
  const NAV = [
    { id: 'cieplownictwo',         pl: 'Ciepłownictwo',          en: 'District heating',       href: 'cieplownictwo.html' },
    { id: 'energetyka',            pl: 'Energetyka',            en: 'Energy',                 href: 'energetyka.html' },
    { id: 'infrastruktura-it',     pl: 'Infrastruktura IT',     en: 'IT Infrastructure',      href: 'infrastruktura-it.html' },
    { id: 'produkcja-kontraktowa', pl: 'Produkcja kontraktowa', en: 'Contract Manufacturing', href: 'produkcja-kontraktowa.html' },
    { id: 'kontakt',               pl: 'Kontakt',               en: 'Contact',                href: 'kontakt.html' }
  ];

  function renderHeader(el) {
    const active = el.dataset.active || '';
    const navHtml = NAV.map(n => {
      const cls = n.id === active ? 'active' : '';
      return `<a href="${n.href}" class="${cls}" data-pl="${n.pl}" data-en="${n.en}">${n.pl}</a>`;
    }).join('');
    el.outerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a href="index.html" class="logo-link">
            <img src="assets/logo.png" alt="INVERSIS" class="logo">
          </a>
          <nav class="main-nav">${navHtml}</nav>
          <div class="header-actions">
            <div class="lang-toggle">
              <button data-lang="pl" class="active">PL</button>
              <button data-lang="en">EN</button>
        <button data-lang="uk">UA</button>
        <button data-lang="hy">AM</button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter(el) {
    el.outerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <img src="assets/logo.png" alt="INVERSIS" class="footer-logo">
          <div class="footer-col">
            <h4 data-pl="Spółka" data-en="Company">Spółka</h4>
            <p>Inversis Group P.S.A.</p>
            <p>ul. Rondo ONZ 1</p>
            <p>00-124 Warszawa</p>
          </div>
          <div class="footer-col">
            <h4 data-pl="Kontakt" data-en="Contact">Kontakt</h4>
            <p><a href="tel:+48571271846">+48 571 271 846</a></p>
            <p><a href="mailto:contact@inversis-group.com">contact@inversis-group.com</a></p>
          </div>
          <div class="footer-col">
            <h4 data-pl="Obszary działalności" data-en="Business areas">Obszary działalności</h4>
            <p data-pl="Energetyka" data-en="Energy">Energetyka</p>
            <p data-pl="Infrastruktura IT" data-en="IT Infrastructure">Infrastruktura IT</p>
            <p data-pl="Ciepłownictwo" data-en="District heating">Ciepłownictwo</p>
            <p data-pl="Produkcja kontraktowa" data-en="Contract Manufacturing">Produkcja kontraktowa</p>
          </div>
        </div>
      </footer>
    `;
  }

  function init() {
    document.querySelectorAll('[data-inversis-header]').forEach(renderHeader);
    document.querySelectorAll('[data-inversis-footer]').forEach(renderFooter);
    const yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();
    // Apply current language to newly-rendered chrome and re-bind toggle clicks
    if (window.initI18n) window.initI18n();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
