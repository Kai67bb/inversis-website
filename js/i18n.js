/* ============================================================
   INVERSIS — shared i18n
   Two ways to mark up translatable content:

   A) Inline attributes (preferred for one-off page text):
        <h2 data-pl="Polski tekst" data-en="English text"></h2>
        <p  data-pl="Z <strong>HTML</strong>." data-en="With <strong>HTML</strong>."></p>

   B) Dictionary lookup (used by boiler pages via window.I18N):
        <span data-i18n="some_key"></span>

   The lang-toggle buttons in the header (.lang-toggle button[data-lang])
   flip between 'pl', 'en', 'uk', 'hy' and persist the choice in
   localStorage. The four buttons are progressively collapsed into a
   compact dropdown (current language + caret) so the header stays tidy.
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
      const Xd = window.I18N_X || {};
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const entry = window.I18N[el.getAttribute('data-i18n')];
        if (!entry) return;
        let content;
        if (entry[lang] !== undefined) {
          content = entry[lang];
        } else if ((lang === 'uk' || lang === 'hy') && Xd[entry.pl] && Xd[entry.pl][lang] !== undefined) {
          content = Xd[entry.pl][lang];          // fallback: słownik X po tekście PL
        } else {
          content = entry.en !== undefined ? entry.en : entry.pl;
        }
        if (content !== undefined) setContent(el, content);
      });
    }

    // 3) Update toggle button state (support both `is-active` and `active`)
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.classList.toggle('active', on);
    });

    // 3b) Reflect the active language on each collapsed dropdown trigger
    document.querySelectorAll('.lang-toggle.lang-dd').forEach(dd => {
      const active = dd.querySelector('button[data-lang].active, button[data-lang].is-active')
                  || dd.querySelector('button[data-lang][data-lang="' + lang + '"]');
      const code = dd.querySelector('.lang-dd__code');
      if (active && code) code.textContent = (active.textContent || '').trim();
    });

    // 4) Notify other components
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  /* ---- Compact dropdown ------------------------------------ */
  const DD_STYLE_ID = 'lang-dd-style';
  function injectDropdownStyle() {
    if (document.getElementById(DD_STYLE_ID)) return;
    const css = `
.lang-toggle.lang-dd{position:relative;display:inline-block;border:0;overflow:visible;background:transparent;border-radius:0;}
.lang-dd__toggle{display:inline-flex;align-items:center;gap:7px;background:#fff;
  border:1px solid var(--border, var(--inv-line, #e3e3e1));border-radius:6px;
  padding:7px 11px;font:600 12px/1 'Montserrat',system-ui,sans-serif;letter-spacing:.07em;
  text-transform:uppercase;color:var(--ink, var(--inv-ink, #1a1a1a));cursor:pointer;transition:border-color .15s,background .15s;}
.lang-dd__toggle:hover{border-color:var(--orange, var(--inv-orange, #d2601c));}
.lang-dd__toggle svg{width:9px;height:9px;flex:none;transition:transform .2s;opacity:.7;}
.lang-toggle.lang-dd.open .lang-dd__toggle svg{transform:rotate(180deg);}
.lang-dd__menu{position:absolute;top:calc(100% + 6px);right:0;min-width:100%;
  display:flex;flex-direction:column;background:#fff;
  border:1px solid var(--border, var(--inv-line, #e3e3e1));border-radius:6px;overflow:hidden;
  box-shadow:0 10px 30px rgba(0,0,0,.13);opacity:0;visibility:hidden;transform:translateY(-5px);
  transition:opacity .15s ease,transform .15s ease,visibility .15s;z-index:300;}
.lang-toggle.lang-dd.open .lang-dd__menu,.lang-toggle.lang-dd:focus-within .lang-dd__menu{opacity:1;visibility:visible;transform:translateY(0);}
.lang-dd__menu button{display:block;width:100%;text-align:left;background:#fff;border:0;
  padding:9px 16px;font:600 12px/1 'Montserrat',system-ui,sans-serif;letter-spacing:.07em;
  text-transform:uppercase;color:var(--muted, var(--inv-ink-3, #6a6a68));cursor:pointer;white-space:nowrap;transition:background .12s,color .12s;}
.lang-dd__menu button:hover{background:#f5f4f2;color:var(--ink, var(--inv-ink, #1a1a1a));}
.lang-dd__menu button.active,.lang-dd__menu button.is-active{background:var(--orange, var(--inv-orange, #d2601c));color:#fff;}
`;
    const s = document.createElement('style');
    s.id = DD_STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  function enhanceToggle(toggle) {
    if (toggle.dataset.ddReady) return;
    const buttons = Array.from(toggle.querySelectorAll('button[data-lang]'));
    if (buttons.length < 2) return;            // nothing to collapse
    toggle.dataset.ddReady = '1';
    toggle.classList.add('lang-dd');

    // Build trigger
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lang-dd__toggle';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    const active = buttons.find(b => b.classList.contains('active') || b.classList.contains('is-active')) || buttons[0];
    trigger.innerHTML = '<span class="lang-dd__code">' + ((active.textContent || '').trim() || 'PL') +
      '</span><svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>';

    // Move language buttons into a menu
    const menu = document.createElement('div');
    menu.className = 'lang-dd__menu';
    buttons.forEach(b => menu.appendChild(b));

    toggle.appendChild(trigger);
    toggle.appendChild(menu);

    const close = () => { toggle.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); };
    const open  = () => { toggle.classList.add('open');    trigger.setAttribute('aria-expanded', 'true'); };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle.classList.contains('open') ? close() : open();
    });
    menu.addEventListener('click', (e) => {
      if (e.target.closest('button[data-lang]')) {
        // language switch handler (bindToggles) runs separately; just collapse
        close();
        const a = document.activeElement; if (a && a.blur) a.blur();
      }
    });
  }

  function setupDropdowns() {
    injectDropdownStyle();
    document.querySelectorAll('.lang-toggle').forEach(enhanceToggle);
  }

  // Close any open dropdown when clicking elsewhere / pressing Escape
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.lang-toggle.lang-dd.open').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('open');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.lang-toggle.lang-dd.open').forEach(dd => dd.classList.remove('open'));
  });

  function bindToggles() {
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach(btn => {
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
    setupDropdowns();
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
