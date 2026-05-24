/* ============================================================
   INVERSIS — site-wide JS
   - Language toggle (PL / EN), persisted in localStorage
   - Boiler data + dynamic spec table
   ============================================================ */

/* ---------- 1. Translations ---------- */
const I18N = {
  // navigation
  nav_energy: { pl: 'Energetyka', en: 'Energy' },
  nav_it: { pl: 'Infrastruktura IT', en: 'IT Infrastructure' },
  nav_defense: { pl: 'Obronność', en: 'Defense' },
  nav_contract: { pl: 'Produkcja kontraktowa', en: 'Contract Manufacturing' },
  nav_contact: { pl: 'Kontakt', en: 'Contact' },
  cta_brochure: { pl: 'Pobierz broszurę<br>INVERSIS', en: 'Download<br>brochure' },

  // home
  home_eyebrow: { pl: 'Energetyka', en: 'Energy' },
  home_title_1: { pl: 'Kontenerowe', en: 'Containerized' },
  home_title_2: { pl: 'kotłownie mobilne', en: 'mobile boiler plants' },
  home_lead: {
    pl: 'Modułowe, fabrycznie testowane jednostki gotowe do pracy w każdych warunkach. Wybierz typ kotłowni, aby zobaczyć dostępne warianty mocy oraz pełną specyfikację techniczną.',
    en: 'Modular, factory-tested units ready to operate in any conditions. Choose a plant type to see the available capacity variants and full technical specification.'
  },
  card_water_eyebrow: { pl: 'Energetyka', en: 'Energy' },
  card_water_title: { pl: 'Kotłownie wodne', en: 'Water Boiler Plants' },
  card_water_desc: {
    pl: '12 wariantów mocy od 190 kW do 14 500 kW. Niezawodne źródło ciepła dla przemysłu, ciepłownictwa i obiektów komercyjnych.',
    en: '12 capacity variants from 190 kW to 14,500 kW. A reliable heat source for industry, district heating and commercial facilities.'
  },
  card_steam_eyebrow: { pl: 'Energetyka', en: 'Energy' },
  card_steam_title: { pl: 'Kotłownie parowe', en: 'Steam Boiler Plants' },
  card_steam_desc: {
    pl: '10 wariantów wydajności od 350 kg/h do 22 000 kg/h. Niezawodne źródło pary technologicznej dla przemysłu.',
    en: '10 output variants from 350 kg/h to 22,000 kg/h. Reliable source of process steam for industry.'
  },
  view_specs: { pl: 'Zobacz specyfikację', en: 'View specification' },

  // product pages
  bc_home: { pl: 'Strona główna', en: 'Home' },
  bc_energy: { pl: 'Energetyka', en: 'Energy' },
  bc_water: { pl: 'Kotłownie wodne', en: 'Water boiler plants' },
  bc_water_unit: { pl: 'Kontenerowa kotłownia wodna', en: 'Containerized water boiler plant' },
  bc_steam: { pl: 'Kotłownie parowe', en: 'Steam boiler plants' },
  bc_steam_unit: { pl: 'Kontenerowa kotłownia parowa', en: 'Containerized steam boiler plant' },

  water_title_1: { pl: 'Kontenerowa', en: 'Containerized' },
  water_title_2: { pl: 'kotłownia wodna', en: 'water boiler plant' },
  water_lead: {
    pl: 'Mobilna kontenerowa kotłownia wodna gotowa do pracy ciągłej. Kompaktowa konstrukcja, szybkie uruchomienie i niezawodna eksploatacja w każdych warunkach.',
    en: 'A mobile containerized water boiler plant ready for continuous operation. Compact construction, fast commissioning and dependable operation in any conditions.'
  },
  steam_title_1: { pl: 'Kontenerowe', en: 'Containerized' },
  steam_title_2: { pl: 'kotłownie parowe', en: 'steam boiler plants' },
  steam_lead: {
    pl: 'Mobilne kotłownie parowe w kontenerze dla wymagających procesów technologicznych. Niezawodne źródło pary dla zakładów produkcyjnych, energetyki i ciepłownictwa.',
    en: 'Mobile containerized steam boiler plants for demanding process applications. A dependable source of steam for production plants, energy and district heating.'
  },

  // stats labels
  stat_capacity: { pl: 'Maks. wydajność', en: 'Max. output' },
  stat_pressure: { pl: 'Ciśnienie robocze', en: 'Operating pressure' },
  stat_dimensions: { pl: 'Wymiary transportowe', en: 'Transport dimensions' },
  stat_power: { pl: 'Moc', en: 'Power' },

  // selector
  select_power: { pl: 'Wybierz moc', en: 'Select capacity' },
  select_steam: { pl: 'Wybierz wariant mocy', en: 'Select capacity variant' },
  spec_title: { pl: 'Specyfikacja techniczna', en: 'Technical specification' },

  // section headings (spec)
  sec_general: { pl: 'Ogólne', en: 'General' },
  sec_boiler: { pl: 'Parametry kotła', en: 'Boiler parameters' },
  sec_dim: { pl: 'Wymiary', en: 'Dimensions' },
  sec_supply: { pl: 'Parametry zasilania', en: 'Power supply' },

  // spec labels
  lbl_capacity: { pl: 'Maks. wydajność', en: 'Max. output' },
  lbl_pressure: { pl: 'Ciśnienie robocze kotła', en: 'Operating pressure' },
  lbl_length: { pl: 'Długość', en: 'Length' },
  lbl_width: { pl: 'Szerokość', en: 'Width' },
  lbl_height: { pl: 'Wysokość', en: 'Height' },
  lbl_weight_t: { pl: 'Waga transportowa', en: 'Transport weight' },
  lbl_weight_o: { pl: 'Waga robocza', en: 'Operating weight' },
  lbl_electric: { pl: 'Przyłącze elektryczne', en: 'Electrical connection' },
  lbl_fuel: { pl: 'Rodzaj paliwa', en: 'Fuel type' },

  // fuel values
  fuel_oil: { pl: 'Lekki olej opałowy', en: 'Light heating oil' },
  fuel_gas_oil: { pl: 'Gaz ziemny lub lekki olej opałowy', en: 'Natural gas or light heating oil' },
  not_available: { pl: 'n/d', en: 'n/a' },

  // bottom sections
  key_features: { pl: 'Kluczowe cechy', en: 'Key features' },
  applications: { pl: 'Zastosowania', en: 'Applications' },
  download_brochure: { pl: 'Pobierz broszurę', en: 'Download brochure' },
  brochure_desc: {
    pl: 'Szczegółowe informacje techniczne, schematy i konfiguracje.',
    en: 'Detailed technical information, diagrams and configurations.'
  },

  // water features
  wf_1: { pl: 'Rozdzielnia zasilająco-sterująca', en: 'Power & control switchgear' },
  wf_2: { pl: 'Palnik olejowy', en: 'Oil burner' },
  wf_3: { pl: 'Pompa kotłowa', en: 'Boiler pump' },
  wf_4: { pl: 'Naczynie przeponowe', en: 'Expansion vessel' },
  wf_5: { pl: 'Komin', en: 'Chimney' },
  wf_6: { pl: 'Zbiornik paliwa 1000 litrów', en: '1000-litre fuel tank' },
  wf_7: { pl: 'Przyłącza elastyczne 2 × 10 mb', en: 'Flexible connections 2 × 10 m' },
  wf_8: { pl: 'Osprzęt zabezpieczający w trybie 72h obsługowym', en: 'Safety equipment, 72-hour unattended operation' },

  // water applications
  wa_1: { pl: 'Ogrzewanie obiektów przemysłowych', en: 'Heating of industrial facilities' },
  wa_2: { pl: 'Zasilanie sieci i instalacji ciepłowniczych', en: 'Supplying district heating networks and heating systems' },
  wa_3: { pl: 'Procesy technologiczne wymagające ciepła', en: 'Heat-driven industrial processes' },
  wa_4: { pl: 'Ogrzewanie budynków użyteczności publicznej', en: 'Heating of public-utility buildings' },
  wa_5: { pl: 'Realizacja inwestycji i modernizacji', en: 'Investment and modernization projects' },

  // steam features
  sf_1: { pl: 'Kompletny system w kontenerze', en: 'Complete in-container system' },
  sf_2: { pl: 'Kompletny moduł, gotowy do podłączenia', en: 'Complete module, ready to connect on site' },
  sf_3: { pl: 'Szybki transport i instalacja', en: 'Fast transport and installation' },
  sf_4: { pl: 'Mobilna konstrukcja', en: 'Mobile construction' },
  sf_5: { pl: 'Wysokiej jakości komponenty', en: 'High-quality components' },
  sf_6: { pl: 'Zasilanie gazem ziemnym lub lekkim olejem opałowym', en: 'Natural gas or light heating oil supply' },
  sf_7: { pl: 'Przystosowana do zastosowań przemysłowych', en: 'Designed for industrial applications' },
  sf_8: { pl: 'Niezawodna praca', en: 'Reliable operation' },

  // steam applications
  sa_1: { pl: 'Stałe źródło pary technologicznej', en: 'Steady source of process steam' },
  sa_2: { pl: 'Zasilanie ciągłych procesów produkcyjnych', en: 'Continuous supply for production processes' },
  sa_3: { pl: 'Przemysł spożywczy', en: 'Food industry' },
  sa_4: { pl: 'Produkcja chemiczna', en: 'Chemical production' },
  sa_5: { pl: 'Przemysł papierniczy', en: 'Paper industry' },
  sa_6: { pl: 'Oczyszczanie ścieków', en: 'Wastewater treatment' },

  // footer
  ftr_company: { pl: 'Spółka', en: 'Company' },
  ftr_contact: { pl: 'Kontakt', en: 'Contact' },
  ftr_areas: { pl: 'Obszary działalności', en: 'Business areas' },
  ftr_follow: { pl: 'Śledź nas', en: 'Follow us' },

  // partners
  partners_eyebrow: { pl: 'Partnerzy', en: 'Partners' },
  partners_title: { pl: 'Partnerzy strategiczni', en: 'Strategic partners' },
  partners_lead: {
    pl: 'Współpracujemy z liderami branży kotłowej, łącząc sprawdzone technologie z elastycznością mobilnych rozwiązań.',
    en: 'We work with leaders of the boiler industry, combining proven technologies with the flexibility of mobile solutions.'
  },
  ftr_partners: { pl: 'Partnerzy', en: 'Partners' },

  // footnote
  gas_footnote: {
    pl: '* w przypadku użytkowania na gaz ziemny',
    en: '* when running on natural gas'
  },
};

/* ---------- 2. Apply translations ---------- */
function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = I18N[key];
    if (entry && entry[lang] !== undefined) {
      el.innerHTML = entry[lang];
    }
  });
  // toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  // re-render specs if on a product page
  if (window.__currentVariant) renderSpec(window.__currentVariant);
}

function initLangToggle() {
  const stored = localStorage.getItem('inversis_lang') || 'pl';
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('inversis_lang', lang);
      applyLang(lang);
    });
  });
  applyLang(stored);
}

/* ---------- 3. Boiler data ---------- */
const WATER_VARIANTS = [
  { id: '190',   label: '190 kW',    capacity: '190 kW',    pressure: '5 bar',  length: '3000 mm',       width: '2438 mm', height: '2770 mm', weightT: '1800 kg',  weightO: '3000 kg',  electric: '4,1 kW',  fuel: 'fuel_oil' },
  { id: '250',   label: '250 kW',    capacity: '250 kW',    pressure: '5 bar',  length: '3000 mm',       width: '2438 mm', height: '2770 mm', weightT: '2000 kg',  weightO: '3550 kg',  electric: '4,1 kW',  fuel: 'fuel_oil' },
  { id: '360',   label: '360 kW',    capacity: '360 kW',    pressure: '5 bar',  length: '3000 mm',       width: '2438 mm', height: '2770 mm', weightT: '2500 kg',  weightO: '3900 kg',  electric: '4,5 kW',  fuel: 'fuel_oil' },
  { id: '500',   label: '500 kW',    capacity: '500 kW',    pressure: '5 bar',  length: '3600 mm',       width: '2438 mm', height: '2770 mm', weightT: '3300 kg',  weightO: '5400 kg',  electric: '7,5 kW',  fuel: 'fuel_oil' },
  { id: '700',   label: '700 kW',    capacity: '700 kW',    pressure: '14 bar', length: '6150 / 6610* mm', width: '2438 mm', height: '2780 mm', weightT: '7200 kg',  weightO: '8700 kg',  electric: '12,5 kW', fuel: 'fuel_gas_oil' },
  { id: '1000',  label: '1000 kW',   capacity: '1000 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2438 mm', height: '2780 mm', weightT: '7800 kg',  weightO: '9700 kg',  electric: '15 kW',   fuel: 'fuel_gas_oil' },
  { id: '2000',  label: '2000 kW',   capacity: '2000 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2541 mm', height: '2850 mm', weightT: '9000 kg',  weightO: '12000 kg', electric: '16,5 kW', fuel: 'fuel_gas_oil' },
  { id: '2500',  label: '2500 kW',   capacity: '2500 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2541 mm', height: '3050 mm', weightT: '10300 kg', weightO: '13500 kg', electric: '32 kW',   fuel: 'fuel_gas_oil' },
  { id: '2700',  label: '2700 kW',   capacity: '2700 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2541 mm', height: '3150 mm', weightT: '11200 kg', weightO: '14200 kg', electric: '32 kW',   fuel: 'fuel_gas_oil' },
  { id: '4000',  label: '4000 kW',   capacity: '4000 kW',   pressure: '25 bar', length: '9500 mm',       width: '2800 mm', height: '3000 mm', weightT: '28800 kg', weightO: '35900 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '6500',  label: '6500 kW',   capacity: '6500 kW',   pressure: '27 bar', length: '10300 mm',      width: '3000 mm', height: '3400 mm', weightT: '39800 kg', weightO: '49000 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '10500', label: '10500 kW',  capacity: '10500 kW',  pressure: '22 bar', length: '11700 mm',      width: '3500 mm', height: '3800 mm', weightT: '52000 kg', weightO: '67000 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '14500', label: '14500 kW',  capacity: '14500 kW',  pressure: '21 bar', length: '12400 mm',      width: '3900 mm', height: '4000 mm', weightT: '68000 kg', weightO: '105000 kg',electric: null,      fuel: 'fuel_gas_oil' },
];

const STEAM_VARIANTS = [
  { id: '350',   label: '350 kg/h',   capacity: '350 kg/h',   pressure: '10 bar', length: '6150 mm',  width: '2438 mm', height: '2790 mm', weightT: '7000 kg',  weightO: '8500 kg',  electric: '6 kW',    fuel: 'fuel_gas_oil' },
  { id: '1000',  label: '1000 kg/h',  capacity: '1000 kg/h',  pressure: '13 bar', length: '6150 mm',  width: '2438 mm', height: '2790 mm', weightT: '7500 kg',  weightO: '9500 kg',  electric: '7,5 kW',  fuel: 'fuel_gas_oil' },
  { id: '2000',  label: '2000 kg/h',  capacity: '2000 kg/h',  pressure: '13 bar', length: '6150 mm',  width: '2438 mm', height: '2900 mm', weightT: '10000 kg', weightO: '14000 kg', electric: '9,5 kW',  fuel: 'fuel_gas_oil' },
  { id: '2500',  label: '2500 kg/h',  capacity: '2500 kg/h',  pressure: '14 bar', length: '6150 mm',  width: '2438 mm', height: '2800 mm', weightT: '11500 kg', weightO: '16000 kg', electric: '20 kW',   fuel: 'fuel_gas_oil' },
  { id: '4000',  label: '4000 kg/h',  capacity: '4000 kg/h',  pressure: '16 bar', length: '9500 mm',  width: '2438 mm', height: '3200 mm', weightT: '17000 kg', weightO: '25500 kg', electric: '27 kW',   fuel: 'fuel_gas_oil' },
  { id: '6000',  label: '6000 kg/h',  capacity: '6000 kg/h',  pressure: '25 bar', length: '9500 mm',  width: '2800 mm', height: '3000 mm', weightT: '28800 kg', weightO: '35900 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '10000', label: '10000 kg/h', capacity: '10000 kg/h', pressure: '27 bar', length: '10300 mm', width: '3000 mm', height: '3400 mm', weightT: '39800 kg', weightO: '49000 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '12000', label: '12000 kg/h', capacity: '12000 kg/h', pressure: '25 bar', length: '11700 mm', width: '3500 mm', height: '3800 mm', weightT: '52000 kg', weightO: '67000 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '16000', label: '16000 kg/h', capacity: '16000 kg/h', pressure: '22 bar', length: '11700 mm', width: '3500 mm', height: '3800 mm', weightT: '52000 kg', weightO: '67000 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '22000', label: '22000 kg/h', capacity: '22000 kg/h', pressure: '21 bar', length: '12400 mm', width: '3900 mm', height: '4000 mm', weightT: '68000 kg', weightO: '105000 kg',electric: null,      fuel: 'fuel_gas_oil' },
];

/* ---------- 4. Render spec table ---------- */
function tr(key) {
  const lang = localStorage.getItem('inversis_lang') || 'pl';
  return (I18N[key] && I18N[key][lang]) || key;
}

function renderSpec(variant) {
  window.__currentVariant = variant;
  const lang = localStorage.getItem('inversis_lang') || 'pl';
  const fuel = tr(variant.fuel);
  const na = tr('not_available');
  const dim = `${variant.length.replace(/ mm$/,'')} × ${variant.width.replace(/ mm$/,'')} × ${variant.height.replace(/ mm$/,'')} mm`;

  // Stats row (above-fold quick stats)
  const setText = (sel, v) => { const el = document.querySelector(sel); if (el) el.textContent = v; };
  setText('[data-stat="capacity"]', variant.capacity);
  setText('[data-stat="pressure"]', variant.pressure);
  setText('[data-stat="dimensions"]', dim);
  setText('[data-stat="power"]', variant.electric || na);

  // Right sidebar spec rows
  setText('[data-spec="fuel"]', fuel);
  setText('[data-spec="weightT"]', variant.weightT);
  setText('[data-spec="weightO"]', variant.weightO);
  setText('[data-spec="capacity"]', variant.capacity);
  setText('[data-spec="pressure"]', variant.pressure);
  setText('[data-spec="length"]', variant.length);
  setText('[data-spec="width"]', variant.width);
  setText('[data-spec="height"]', variant.height);
  setText('[data-spec="electric"]', variant.electric || na);

  // Footnote: only show when length contains an asterisk
  const fn = document.querySelector('[data-gas-footnote]');
  if (fn) {
    if (variant.length.includes('*')) {
      fn.hidden = false;
      fn.textContent = tr('gas_footnote');
    } else {
      fn.hidden = true;
    }
  }

  // Brochure thumb power
  setText('[data-brochure-power]', variant.label);
}

/* ---------- 5. Init power buttons ---------- */
function initPowerButtons(variants) {
  const grid = document.querySelector('.power-grid');
  if (!grid) return;
  grid.innerHTML = '';
  variants.forEach((v, idx) => {
    const btn = document.createElement('button');
    btn.className = 'power-btn' + (idx === 0 ? ' active' : '');
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

/* ---------- 6. Accordion ---------- */
function initAccordion() {
  document.querySelectorAll('.spec-section').forEach(sec => {
    const head = sec.querySelector('.spec-section-head');
    if (!head) return;
    head.addEventListener('click', () => sec.classList.toggle('collapsed'));
  });
}

/* ---------- 7. Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initAccordion();
  if (document.body.dataset.page === 'water') initPowerButtons(WATER_VARIANTS);
  if (document.body.dataset.page === 'steam') initPowerButtons(STEAM_VARIANTS);
});
