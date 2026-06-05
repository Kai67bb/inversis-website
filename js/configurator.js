/* ============================================================
   INVERSIS — Configurator runner
   Renders interactive option fields + live summary panel.

   Labels (`field.label`, `option.label`) can be either a plain string
   or a {pl, en} object — the active language is read from
   window.getLang() (provided by js/i18n.js, falls back to 'pl').

   The configurator listens for the 'langchange' event on `window`
   and re-renders all labels in place.

   Usage:
     Configurator.init({
       mount:        '#cfg-fields',     // panel body to fill with rows
       summaryMount: '#cfg-summary',    // summary list to fill with rows
       data: { fields: [...], summaryNotice: '...' },
       defaults: { fieldId: 'optionId' | ['optionId', ...] }
     });
   ============================================================ */
window.Configurator = (function () {

  function getLang() {
    return (window.getLang && window.getLang()) || localStorage.getItem('inversis_lang') || 'pl';
  }

  function L(label) {
    if (label && typeof label === 'object') {
      const lang = getLang();
      return label[lang] !== undefined ? label[lang] : (label.en !== undefined ? label.en : (label.pl || ''));
    }
    return label != null ? String(label) : '';
  }

  // Enquiry e-mail wording per language
  const ENQ = {
    pl: { subj: 'Zapytanie ofertowe', intro: 'Dzień dobry,\n\nproszę o ofertę na poniższą konfigurację:', url: 'Strona', regards: 'Pozdrawiam,' },
    en: { subj: 'Request for quotation', intro: 'Hello,\n\nplease send a quote for the configuration below:', url: 'Page', regards: 'Best regards,' },
    uk: { subj: 'Запит на пропозицію', intro: 'Доброго дня,\n\nпрошу надати комерційну пропозицію щодо наведеної нижче конфігурації:', url: 'Сторінка', regards: 'З повагою,' },
    hy: { subj: 'Հարցում գնառաջարկի', intro: 'Բարև Ձեզ,\n\nխնդրում եմ տրամադրել գնառաջարկ ստորև բերված կազմաձևման համար․', url: 'Էջ', regards: 'Հարգանքով,' }
  };

  function init(opts) {
    const mount = document.querySelector(opts.mount);
    const summaryMount = document.querySelector(opts.summaryMount);
    if (!mount || !summaryMount) return;

    const fields = opts.data.fields || [];
    const defaults = opts.defaults || {};

    // -- state --
    const state = {};
    fields.forEach(f => {
      const selection = f.selection || 'single';
      const def = defaults[f.id];
      if (def !== undefined) {
        state[f.id] = selection === 'multiple' ? (Array.isArray(def) ? def.slice() : [def]) : def;
      } else {
        state[f.id] = selection === 'multiple' ? [] : null;
      }
    });

    // -- render fields scaffold (rebuilt fully when called) --
    function buildFields() {
      mount.innerHTML = '';
      fields.forEach(f => {
        const row = document.createElement('div');
        row.className = 'cfg-row';
        row.innerHTML = `
          <div class="cfg-row__label" data-cfg-field-label="${f.id}">${L(f.label)}</div>
          <div class="cfg-row__options" data-field="${f.id}"></div>
        `;
        const optsEl = row.querySelector('.cfg-row__options');
        f.options.forEach(o => {
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = 'cfg-pill';
          pill.dataset.optionId = o.id;
          pill.dataset.cfgOption = f.id;
          pill.textContent = L(o.label);
          if (o.description) pill.title = L(o.description);
          pill.addEventListener('click', () => toggle(f, o.id));
          optsEl.appendChild(pill);
        });
        mount.appendChild(row);
      });
    }

    function toggle(field, optionId) {
      const selection = field.selection || 'single';
      if (selection === 'multiple') {
        const arr = state[field.id];
        const idx = arr.indexOf(optionId);
        if (idx >= 0) arr.splice(idx, 1);
        else arr.push(optionId);
      } else {
        state[field.id] = (state[field.id] === optionId) ? null : optionId;
      }
      render();
    }

    function render() {
      // refresh field labels + pill labels (in case lang changed)
      fields.forEach(f => {
        const labelEl = mount.querySelector(`[data-cfg-field-label="${f.id}"]`);
        if (labelEl) labelEl.textContent = L(f.label);

        const cur = state[f.id];
        const optsEl = mount.querySelector(`[data-field="${f.id}"]`);
        optsEl.querySelectorAll('.cfg-pill').forEach(p => {
          // refresh label text
          const opt = f.options.find(o => o.id === p.dataset.optionId);
          if (opt) p.textContent = L(opt.label);
          // selection state
          const sel = Array.isArray(cur) ? cur.includes(p.dataset.optionId) : (p.dataset.optionId === cur);
          p.classList.toggle('is-selected', !!sel);
        });
      });

      // summary
      summaryMount.innerHTML = '';
      fields.forEach(f => {
        const cur = state[f.id];
        const row = document.createElement('div');
        row.className = 'cfg__summary-row';
        let valHtml = '<span class="cfg__summary-val cfg__summary-val--empty">—</span>';
        if (Array.isArray(cur)) {
          if (cur.length > 0) {
            const items = cur.map(id => {
              const opt = f.options.find(o => o.id === id);
              return opt ? L(opt.label) : id;
            });
            valHtml = `<div class="cfg__summary-val"><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`;
          }
        } else if (cur) {
          const opt = f.options.find(o => o.id === cur);
          if (opt) valHtml = `<span class="cfg__summary-val">${L(opt.label)}</span>`;
        }
        row.innerHTML = `<span class="cfg__summary-key">${L(f.label)}:</span>${valHtml}`;
        summaryMount.appendChild(row);
      });

      updateEnquiry();
    }

    // Build a mailto: link carrying the chosen configuration as the e-mail body
    function updateEnquiry() {
      const links = document.querySelectorAll('a.cfg__cta, a[data-enquiry]');
      if (!links.length) return;
      const lang = getLang();
      const t = ENQ[lang] || ENQ.pl;
      const h1 = document.querySelector('h1');
      const product = ((h1 && (h1.innerText || h1.textContent)) || document.title || '').replace(/\s+/g, ' ').trim();
      const lines = [];
      fields.forEach(f => {
        const cur = state[f.id];
        let val = '';
        if (Array.isArray(cur)) val = cur.map(id => { const o = f.options.find(o => o.id === id); return o ? L(o.label) : id; }).join(', ');
        else if (cur) { const o = f.options.find(o => o.id === cur); val = o ? L(o.label) : ''; }
        if (val) lines.push(`• ${L(f.label)}: ${val}`);
      });
      const subject = `${t.subj}: ${product}`;
      const body = `${t.intro}\n\n${product}\n${lines.join('\n')}\n\n${t.url}: ${location.href}\n\n${t.regards}`;
      const href = `mailto:biuro@inversis-group.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      links.forEach(a => a.setAttribute('href', href));
    }

    buildFields();
    render();

    // Re-render when language changes
    window.addEventListener('langchange', render);
  }

  return { init };
})();
