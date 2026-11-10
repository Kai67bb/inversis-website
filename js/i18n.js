/* ============================================================
   INVERSIS — shared i18n (wersja z osobnymi adresami dla języków)

   Od 11.2026 każdy język ma własne, statycznie wygenerowane strony:
     /            → EN (domyślna, x-default)
     /uk/         → українська
     /ro/         → română
     /hy/         → հայերեն
     /pl/         → polski: tylko zabudowa kontenerowa / produkcja kontraktowa + kontakt
   Język strony = atrybut <html lang>. Teksty są już wpisane w HTML
   (generator: tools/build-i18n.py), a ten skrypt:
     • tłumaczy elementy dokładane dynamicznie (mega-menu, konfiguratory,
       galerie) — oznaczone data-pl / data-en / data-i18n,
     • zamienia przełącznik języka (linki <a data-lang>) w dropdown,
     • na stronie EN proponuje (bez przekierowania) wersję w języku
       przeglądarki użytkownika.
   Po każdej zmianie wywołuje zdarzenie 'langchange' na window.
   ============================================================ */
(function () {
  var LANGS = ['en', 'pl', 'uk', 'ro', 'hy'];

  function pageLang() {
    var l = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().slice(0, 2);
    return LANGS.indexOf(l) >= 0 ? l : 'en';
  }

  function setContent(el, content) {
    if (content === undefined || content === null) return;
    if (/<[a-z][^>]*>/i.test(content)) { if (el.innerHTML !== content) el.innerHTML = content; }
    else if (el.textContent !== content) el.textContent = content;
  }

  function translatePl(pl, en, lang) {
    if (lang === 'pl') return pl;
    if (lang === 'en') return en !== undefined ? en : pl;
    var X = window.I18N_X || {};
    var tr = X[pl];
    return (tr && tr[lang]) || en || pl;
  }

  function applyLang(lang) {
    lang = lang || pageLang();

    // 1) Inline data-pl / data-en attributes (+ uk/hy/ro via central dictionary)
    document.querySelectorAll('[data-pl]').forEach(function (el) {
      setContent(el, translatePl(el.dataset.pl, el.dataset.en, lang));
    });

    // 2) Dictionary lookup via window.I18N (boiler pages)
    if (window.I18N) {
      var Xd = window.I18N_X || {};
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var entry = window.I18N[el.getAttribute('data-i18n')];
        if (!entry) return;
        var content;
        if (entry[lang] !== undefined) content = entry[lang];
        else if (lang === 'pl') content = entry.pl;
        else if (lang !== 'en' && Xd[entry.pl] && Xd[entry.pl][lang] !== undefined) content = Xd[entry.pl][lang];
        else content = entry.en !== undefined ? entry.en : entry.pl;
        setContent(el, content);
      });
    }

    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  /* ---- Compact dropdown for the language links ------------------- */
  var DD_STYLE_ID = 'lang-dd-style';
  function injectDropdownStyle() {
    if (document.getElementById(DD_STYLE_ID)) return;
    var css =
'.lang-toggle.lang-dd{position:relative;display:inline-block;border:0;overflow:visible;background:transparent;border-radius:0;}' +
'.lang-dd__toggle{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1px solid var(--border, var(--inv-line, #e3e3e1));border-radius:6px;padding:7px 11px;font:600 12px/1 "Montserrat",system-ui,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:var(--ink, var(--inv-ink, #1a1a1a));cursor:pointer;transition:border-color .15s,background .15s;}' +
'.lang-dd__toggle:hover{border-color:var(--orange, var(--inv-orange, #d2601c));}' +
'.lang-dd__toggle svg{width:9px;height:9px;flex:none;transition:transform .2s;opacity:.7;}' +
'.lang-toggle.lang-dd.open .lang-dd__toggle svg{transform:rotate(180deg);}' +
'.lang-dd__menu{position:absolute;top:calc(100% + 6px);right:0;min-width:100%;display:flex;flex-direction:column;background:#fff;border:1px solid var(--border, var(--inv-line, #e3e3e1));border-radius:6px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.13);opacity:0;visibility:hidden;transform:translateY(-5px);transition:opacity .15s ease,transform .15s ease,visibility .15s;z-index:300;}' +
'.lang-toggle.lang-dd.open .lang-dd__menu,.lang-toggle.lang-dd:focus-within .lang-dd__menu{opacity:1;visibility:visible;transform:translateY(0);}' +
'.lang-dd__menu a{display:block;width:100%;box-sizing:border-box;text-align:left;background:#fff;border:0;padding:9px 16px;font:600 12px/1 "Montserrat",system-ui,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:var(--muted, var(--inv-ink-3, #6a6a68));text-decoration:none;cursor:pointer;white-space:nowrap;transition:background .12s,color .12s;}' +
'.lang-dd__menu a:hover{background:#f5f4f2;color:var(--ink, var(--inv-ink, #1a1a1a));}' +
'.lang-dd__menu a.active,.lang-dd__menu a.is-active{background:var(--orange, var(--inv-orange, #d2601c));color:#fff;}' +
'.lang-suggest{position:fixed;left:16px;right:16px;bottom:16px;z-index:400;max-width:520px;margin:0 auto;display:flex;align-items:center;gap:12px;background:#16202E;color:#fff;border-radius:8px;padding:12px 14px 12px 18px;box-shadow:0 12px 32px rgba(0,0,0,.25);font:500 14px/1.4 "Montserrat",system-ui,sans-serif;}' +
'.lang-suggest a{color:#fff;font-weight:700;white-space:nowrap;text-decoration:underline;text-underline-offset:3px;}' +
'.lang-suggest span{flex:1;}' +
'.lang-suggest button{background:transparent;border:0;color:#fff;font-size:20px;line-height:1;cursor:pointer;padding:4px 6px;opacity:.75;}' +
'.lang-suggest button:hover{opacity:1;}';
    var s = document.createElement('style');
    s.id = DD_STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  function enhanceToggle(toggle) {
    if (toggle.dataset.ddReady) return;
    var links = Array.prototype.slice.call(toggle.querySelectorAll('a[data-lang]'));
    if (links.length < 2) return;
    toggle.dataset.ddReady = '1';
    toggle.classList.add('lang-dd');

    var lang = pageLang();
    var active = links.filter(function (a) { return a.dataset.lang === lang; })[0] || links[0];
    links.forEach(function (a) {
      var on = a === active;
      a.classList.toggle('active', on);
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page');
      a.addEventListener('click', function () {
        try { localStorage.setItem('inversis_lang', a.dataset.lang); } catch (e) {}
      });
    });

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lang-dd__toggle';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<span class="lang-dd__code">' + (active.textContent || '').trim() +
      '</span><svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>';

    var menu = document.createElement('div');
    menu.className = 'lang-dd__menu';
    links.forEach(function (a) { menu.appendChild(a); });
    toggle.innerHTML = '';
    toggle.appendChild(trigger);
    toggle.appendChild(menu);

    var close = function () { toggle.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); };
    var open = function () { toggle.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); };
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle.classList.contains('open') ? close() : open();
    });
  }

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.lang-toggle.lang-dd.open').forEach(function (dd) {
      if (!dd.contains(e.target)) dd.classList.remove('open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.lang-toggle.lang-dd.open').forEach(function (dd) { dd.classList.remove('open'); });
  });

  /* ---- Suggest the visitor's language (EN pages only, no redirect) ---- */
  var SUGGEST = {
    pl: { text: 'Ta strona jest dostępna po polsku.', go: 'Przejdź', close: 'Zamknij' },
    uk: { text: 'Цей сайт доступний українською.', go: 'Перейти', close: 'Закрити' },
    ro: { text: 'Acest site este disponibil în limba română.', go: 'Deschide', close: 'Închide' },
    hy: { text: 'Այս կայքը հասանելի է հայերենով։', go: 'Անցնել', close: 'Փակել' }
  };
  function suggestLanguage() {
    if (pageLang() !== 'en') return;
    var store = function (k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } };
    if (store('inversis_lang') || store('inversis_lang_suggest_closed')) return;
    var prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']);
    var want = null;
    for (var i = 0; i < prefs.length && !want; i++) {
      var p = String(prefs[i]).toLowerCase().slice(0, 2);
      if (p === 'en') return;
      if (SUGGEST[p]) want = p;
    }
    if (!want) return;
    var link = document.querySelector('link[rel="alternate"][hreflang="' + want + '"]') ||
               document.querySelector('.lang-toggle a[data-lang="' + want + '"][data-suggest]');
    if (!link) return;
    var t = SUGGEST[want];
    var bar = document.createElement('div');
    bar.className = 'lang-suggest';
    bar.setAttribute('lang', want);
    bar.innerHTML = '<span>' + t.text + '</span><a href="' + link.getAttribute('href') + '">' + t.go + ' →</a>' +
      '<button type="button" aria-label="' + t.close + '">&times;</button>';
    bar.querySelector('a').addEventListener('click', function () { store('inversis_lang', want); });
    bar.querySelector('button').addEventListener('click', function () { store('inversis_lang_suggest_closed', '1'); bar.remove(); });
    document.body.appendChild(bar);
  }

  function init() {
    injectDropdownStyle();
    document.querySelectorAll('.lang-toggle').forEach(enhanceToggle);
    applyLang(pageLang());
    suggestLanguage();
  }

  // Expose so other modules / late-rendered chrome can call us
  window.applyLang = applyLang;
  window.getLang = pageLang;
  window.initI18n = function () {
    document.querySelectorAll('.lang-toggle').forEach(enhanceToggle);
    applyLang(pageLang());
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
