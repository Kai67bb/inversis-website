/* ============================================================
   INVERSIS — shared i18n
   Two ways to mark up translatable content:

   A) Inline attributes (preferred for one-off page text):
        <h2 data-pl="Polski tekst" data-en="English text"></h2>
        <p  data-pl="Z <strong>HTML</strong>." data-en="With <strong>HTML</strong>."></p>

   B) Dictionary lookup (used by boiler pages via window.I18N):
        <span data-i18n="some_key"></span>

   The lang-toggle buttons in the header (.lang-toggle button[data-lang])
   flip between 'pl' and 'en' and persist the choice in localStorage.
   On every change a 'langchange' CustomEvent fires on window so other
   components (configurator, boiler spec table) can re-render.
   ============================================================ */
(function () {

  function setContent(el, content) {
    if (content === undefined || content === null) return;
    if (/<[a-z][^>]*>/i.test(content)) el.innerHTML = content;
    else el.textContent = content;
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    // 1) Inline data-pl / data-en attributes (+ uk/hy via central dictionary)
    const X = window.I18N_X || {};
    document.querySelectorAll('[data-pl]').forEach(el => {
      let content;
      if (lang === 'pl' || lang === 'en') {
        content = el.dataset[lang];
      } else {
        const tr = X[el.dataset.pl];
        content = (tr && tr[lang]) || el.dataset.en || el.dataset.pl;
      }
      setContent(el, content);
    });

    // 2) Dictionary lookup via window.I18N (boiler pages) — fall back to EN then PL
    if (window.I18N) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const entry = window.I18N[el.getAttribute('data-i18n')];
        if (!entry) return;
        const content = entry[lang] !== undefined ? entry[lang]
                      : entry.en !== undefined ? entry.en : entry.pl;
        if (content !== undefined) setContent(el, content);
      });
    }

    // 3) Update toggle button state (support both `is-active` and `active`)
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.classList.toggle('active', on);
    });

    // 4) Notify other components
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function bindToggles() {
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      if (btn.__i18nBound) return;
      btn.__i18nBound = true;
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        localStorage.setItem('inversis_lang', lang);
        applyLang(lang);
      });
    });
  }

  function init() {
    bindToggles();
    const stored = localStorage.getItem('inversis_lang') || 'pl';
    applyLang(stored);
  }

  // Expose so other modules / late-rendered chrome can call us
  window.applyLang = applyLang;
  window.getLang = function () { return localStorage.getItem('inversis_lang') || 'pl'; };
  window.initI18n = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
