/* ============================================================
   INVERSIS — site-wide JS
   - Language toggle (PL / EN), persisted in localStorage
   - Boiler data + dynamic spec table
   ============================================================ */

/* ---------- 1. Translations ---------- */
const I18N = {
  nav_energy: { pl: "Energetyka", en: "Energy", uk: "Енергетика", hy: "Էներգետիկա", ro: "Energetică" },
  nav_it: { pl: "Infrastruktura IT", en: "IT Infrastructure", uk: "ІТ-інфраструктура", hy: "ՏՏ ենթակառուցվածք", ro: "Infrastructură IT" },
  nav_defense: { pl: "Obronność", en: "Defense", uk: "Оборона", hy: "Պաշտպանություն", ro: "Apărare" },
  nav_contract: { pl: "Produkcja kontraktowa", en: "Contract Manufacturing", uk: "Контрактне виробництво", hy: "Պայմանագրային արտադրություն", ro: "Producție la comandă" },
  nav_contact: { pl: "Kontakt", en: "Contact", uk: "Контакти", hy: "Կապ", ro: "Contact" },
  cta_brochure: { pl: "Pobierz broszurę<br>INVERSIS", en: "Download<br>brochure", uk: "Завантажити<br>брошуру", hy: "Ներբեռնել<br>բրոշյուրը", ro: "Descarcă broșura<br>INVERSIS" },
  home_eyebrow: { pl: "Energetyka", en: "Energy", uk: "Енергетика", hy: "Էներգետիկա", ro: "Energetică" },
  home_title_1: { pl: "Kontenerowe", en: "Containerized", uk: "Контейнерні", hy: "Կոնտեյներային", ro: "Centrale termice" },
  home_title_2: { pl: "kotłownie mobilne", en: "mobile boiler plants", uk: "мобільні котельні", hy: "շարժական կաթսայատներ", ro: "mobile containerizate" },
  home_lead: { pl: "Modułowe, fabrycznie testowane jednostki gotowe do pracy w każdych warunkach. Wybierz typ kotłowni, aby zobaczyć dostępne warianty mocy oraz pełną specyfikację techniczną.", en: "Modular, factory-tested units ready to operate in any conditions. Choose a plant type to see the available capacity variants and full technical specification.", uk: "Модульні, перевірені на заводі одиниці, готові до роботи в будь-яких умовах. Оберіть тип котельні, щоб побачити доступні варіанти потужності та повну технічну специфікацію.", hy: "Մոդուլային, գործարանում փորձարկված միավորներ՝ պատրաստ աշխատելու ցանկացած պայմաններում։ Ընտրեք կաթսայատան տեսակը՝ տեսնելու հասանելի հզորության տարբերակները և ամբողջական տեխնիկական բնութագիրը։", ro: "Unități modulare, testate în fabrică, gata de funcționare în orice condiții. Alegeți tipul de centrală termică pentru a vedea variantele de putere disponibile și specificația tehnică completă." },
  card_water_eyebrow: { pl: "Energetyka", en: "Energy", uk: "Енергетика", hy: "Էներգետիկա", ro: "Energetică" },
  card_water_title: { pl: "Kotłownie wodne", en: "Water Boiler Plants", uk: "Водогрійні котельні", hy: "Ջրային կաթսայատներ", ro: "Centrale termice pe apă" },
  card_water_desc: { pl: "12 wariantów mocy od 190 kW do 14 500 kW. Mobilne źródło ciepła do zastosowań tymczasowych i awaryjnych.", en: "12 capacity variants from 190 kW to 14,500 kW. Mobile heat source for temporary and emergency applications.", uk: "12 варіантів потужності від 190 кВт до 14 500 кВт. Мобільне джерело тепла для тимчасових та аварійних застосувань.", hy: "12 հզորության տարբերակ՝ 190 կՎт-ից մինչև 14 500 կՎт։ Շարժական ջերմության աղբյուր ժամանակավոր և վթարային կիրառությունների համար։", ro: "12 variante de putere, de la 190 kW la 14 500 kW. Sursă mobilă de căldură pentru aplicații temporare și de avarie." },
  card_steam_eyebrow: { pl: "Energetyka", en: "Energy", uk: "Енергетика", hy: "Էներգետիկա", ro: "Energetică" },
  card_steam_title: { pl: "Kotłownie parowe", en: "Steam Boiler Plants", uk: "Парові котельні", hy: "Գոլորշու կաթսայատներ", ro: "Centrale termice cu abur" },
  card_steam_desc: { pl: "10 wariantów wydajności od 350 kg/h do 22 000 kg/h. Niezawodne źródło pary technologicznej dla przemysłu.", en: "10 output variants from 350 kg/h to 22,000 kg/h. Reliable source of process steam for industry.", uk: "10 варіантів продуктивності від 350 кг/год до 22 000 кг/год. Надійне джерело технологічної пари для промисловості.", hy: "10 արտադրողականության տարբերակ՝ 350 կգ/ժ-ից մինչև 22 000 կգ/ժ։ Տեխնոլոգիական գոլորշու հուսալի աղբյուր արդյունաբերության համար։", ro: "10 variante de debit, de la 350 kg/h la 22 000 kg/h. Sursă fiabilă de abur tehnologic pentru industrie." },
  view_specs: { pl: "Zobacz specyfikację", en: "View specification", uk: "Дивитися специфікацію", hy: "Տեսնել բնութագիրը", ro: "Vezi specificația" },
  bc_home: { pl: "Strona główna", en: "Home", uk: "Головна", hy: "Գլխավոր", ro: "Pagina principală" },
  bc_energy: { pl: "Energetyka", en: "Energy", uk: "Енергетика", hy: "Էներգետիկա", ro: "Energetică" },
  bc_water: { pl: "Kotłownie wodne", en: "Water boiler plants", uk: "Водогрійні котельні", hy: "Ջրային կաթսայատներ", ro: "Centrale termice pe apă" },
  bc_water_unit: { pl: "Kontenerowa kotłownia wodna", en: "Containerized water boiler plant", uk: "Контейнерна водогрійна котельня", hy: "Կոնտեյներային ջրային կաթսայատուն", ro: "Centrală termică containerizată pe apă" },
  bc_steam: { pl: "Kotłownie parowe", en: "Steam boiler plants", uk: "Парові котельні", hy: "Գոլորշու կաթսայատներ", ro: "Centrale termice cu abur" },
  bc_steam_unit: { pl: "Kontenerowa kotłownia parowa", en: "Containerized steam boiler plant", uk: "Контейнерна парова котельня", hy: "Կոնտեյներային գոլորշու կաթսայատուն", ro: "Centrală termică containerizată cu abur" },
  water_title_1: { pl: "Kontenerowa", en: "Containerized", uk: "Контейнерна", hy: "Կոնտեյներային", ro: "Centrală termică" },
  water_title_2: { pl: "kotłownia wodna", en: "water boiler plant", uk: "водогрійна котельня", hy: "ջրային կաթսայատուն", ro: "containerizată pe apă" },
  water_lead: { pl: "Mobilna kontenerowa kotłownia wodna gotowa do pracy ciągłej. Kompaktowa konstrukcja, szybkie uruchomienie i niezawodna eksploatacja w każdych warunkach.", en: "A mobile containerized water boiler plant ready for continuous operation. Compact construction, fast commissioning and dependable operation in any conditions.", uk: "Мобільна контейнерна водогрійна котельня, готова до безперервної роботи. Компактна конструкція, швидкий запуск і надійна експлуатація в будь-яких умовах.", hy: "Շարժական կոնտեյներային ջրային կաթսայատուն՝ պատրաստ անընդհատ աշխատանքի։ Կոմպակտ կառուցվածք, արագ գործարկում և հուսալի շահագործում ցանկացած պայմաններում։", ro: "Centrală termică mobilă containerizată pe apă, pregătită pentru funcționare continuă. Construcție compactă, punere rapidă în funcțiune și exploatare fiabilă în orice condiții." },
  steam_title_1: { pl: "Kontenerowe", en: "Containerized", uk: "Контейнерні", hy: "Կոնտեյներային", ro: "Centrale termice" },
  steam_title_2: { pl: "kotłownie parowe", en: "steam boiler plants", uk: "парові котельні", hy: "գոլորշու կաթսայատներ", ro: "containerizate cu abur" },
  steam_lead: { pl: "Mobilne kotłownie parowe w kontenerze dla wymagających procesów technologicznych. Niezawodne źródło pary dla zakładów produkcyjnych, energetyki i ciepłownictwa.", en: "Mobile containerized steam boiler plants for demanding process applications. A dependable source of steam for production plants, energy and district heating.", uk: "Мобільні парові котельні в контейнері для вимогливих технологічних процесів. Надійне джерело пари для виробничих підприємств, енергетики й теплопостачання.", hy: "Շարժական գոլորշու կաթսայատներ կոնտեյներում՝ պահանջկոտ տեխնոլոգիական պրոցեսների համար։ Գոլորշու հուսալի աղբյուր արտադրական ձեռնարկությունների, էներգետիկայի և ջերմամատակարարման համար։", ro: "Centrale termice mobile cu abur, în container, pentru procese tehnologice exigente. Sursă fiabilă de abur pentru unități de producție, energetică și termoficare." },
  stat_capacity: { pl: "Maks. wydajność", en: "Max. output", uk: "Макс. продуктивність", hy: "Առավ. արտադրողականություն", ro: "Capacitate max." },
  stat_pressure: { pl: "Ciśnienie robocze", en: "Operating pressure", uk: "Робочий тиск", hy: "Աշխատանքային ճնշում", ro: "Presiune de lucru" },
  stat_dimensions: { pl: "Wymiary transportowe", en: "Transport dimensions", uk: "Транспортні розміри", hy: "Տրանսպորտային չափսեր", ro: "Dimensiuni de transport" },
  stat_power: { pl: "Moc", en: "Power", uk: "Потужність", hy: "Հզորություն", ro: "Putere" },
  select_power: { pl: "Wybierz moc", en: "Select capacity", uk: "Оберіть потужність", hy: "Ընտրեք հզորությունը", ro: "Alegeți puterea" },
  select_steam: { pl: "Wybierz wariant mocy", en: "Select capacity variant", uk: "Оберіть варіант потужності", hy: "Ընտրեք հզորության տարբերակը", ro: "Alegeți varianta de putere" },
  spec_title: { pl: "Specyfikacja techniczna", en: "Technical specification", uk: "Технічна специфікація", hy: "Տեխնիկական բնութագիր", ro: "Specificație tehnică" },
  sec_general: { pl: "Ogólne", en: "General", uk: "Загальні", hy: "Ընդհանուր", ro: "Generale" },
  sec_boiler: { pl: "Parametry kotła", en: "Boiler parameters", uk: "Параметри котла", hy: "Կաթսայի պարամետրեր", ro: "Parametrii cazanului" },
  sec_dim: { pl: "Wymiary", en: "Dimensions", uk: "Розміри", hy: "Չափսեր", ro: "Dimensiuni" },
  sec_supply: { pl: "Parametry zasilania", en: "Power supply", uk: "Параметри живлення", hy: "Սնուցման պարամետրեր", ro: "Parametri de alimentare" },
  lbl_capacity: { pl: "Maks. wydajność", en: "Max. output", uk: "Макс. продуктивність", hy: "Առավ. արտադրողականություն", ro: "Capacitate max." },
  lbl_pressure: { pl: "Ciśnienie robocze kotła", en: "Operating pressure", uk: "Робочий тиск котла", hy: "Կաթսայի աշխատանքային ճնշում", ro: "Presiunea de lucru a cazanului" },
  lbl_length: { pl: "Długość", en: "Length", uk: "Довжина", hy: "Երկարություն", ro: "Lungime" },
  lbl_width: { pl: "Szerokość", en: "Width", uk: "Ширина", hy: "Լայնություն", ro: "Lățime" },
  lbl_height: { pl: "Wysokość", en: "Height", uk: "Висота", hy: "Բարձրություն", ro: "Înălțime" },
  lbl_weight_t: { pl: "Waga transportowa", en: "Transport weight", uk: "Транспортна маса", hy: "Տրանսպորտային զանգված", ro: "Masă la transport" },
  lbl_weight_o: { pl: "Waga robocza", en: "Operating weight", uk: "Робоча маса", hy: "Աշխատանքային զանգված", ro: "Masă în funcționare" },
  lbl_electric: { pl: "Przyłącze elektryczne", en: "Electrical connection", uk: "Електричне підключення", hy: "Էլեկտրական միացում", ro: "Racord electric" },
  lbl_fuel: { pl: "Rodzaj paliwa", en: "Fuel type", uk: "Тип палива", hy: "Վառելիքի տեսակ", ro: "Tip de combustibil" },
  fuel_oil: { pl: "Lekki olej opałowy", en: "Light heating oil", uk: "Легкий мазут", hy: "Թեթև մազութ", ro: "Combustibil lichid ușor" },
  fuel_gas_oil: { pl: "Gaz ziemny lub lekki olej opałowy", en: "Natural gas or light heating oil", uk: "Природний газ або легкий мазут", hy: "Բնական գազ կամ թեթև մազութ", ro: "Gaz natural sau combustibil lichid ușor" },
  not_available: { pl: "n/d", en: "n/a", uk: "н/д", hy: "չկա", ro: "n/a" },
  key_features: { pl: "Kluczowe cechy", en: "Key features", uk: "Ключові характеристики", hy: "Հիմնական հատկանիշներ", ro: "Caracteristici cheie" },
  applications: { pl: "Zastosowania", en: "Applications", uk: "Застосування", hy: "Կիրառություններ", ro: "Aplicații" },
  download_brochure: { pl: "Pobierz broszurę", en: "Download brochure", uk: "Завантажити брошуру", hy: "Ներբեռնել բրոշյուրը", ro: "Descarcă broșura" },
  brochure_desc: { pl: "Szczegółowe informacje techniczne, schematy i konfiguracje.", en: "Detailed technical information, diagrams and configurations.", uk: "Детальна технічна інформація, схеми та конфігурації.", hy: "Մանրամասն տեխնիկական տեղեկություն, սխեմաներ և կազմաձևումներ։", ro: "Informații tehnice detaliate, scheme și configurații." },
  wf_1: { pl: "Rozdzielnia zasilająco-sterująca", en: "Power & control switchgear", uk: "Силовий і керуючий розподільчий щит", hy: "Սնուցման և կառավարման բաշխիչ վահանակ", ro: "Tablou de alimentare și comandă" },
  wf_2: { pl: "Palnik olejowy", en: "Oil burner", uk: "Мазутний пальник", hy: "Մազութի այրիչ", ro: "Arzător pe combustibil lichid" },
  wf_3: { pl: "Pompa kotłowa", en: "Boiler pump", uk: "Котловий насос", hy: "Կաթսայի պոմպ", ro: "Pompă de cazan" },
  wf_4: { pl: "Naczynie przeponowe", en: "Expansion vessel", uk: "Розширювальний бак", hy: "Ընդարձակման բաք", ro: "Vas de expansiune" },
  wf_5: { pl: "Komin", en: "Chimney", uk: "Димар", hy: "Ծխնելույզ", ro: "Coș de fum" },
  wf_6: { pl: "Zbiornik paliwa 1000 litrów", en: "1000-litre fuel tank", uk: "Паливний бак 1000 літрів", hy: "Վառելիքի բաք՝ 1000 լիտր", ro: "Rezervor de combustibil de 1000 de litri" },
  wf_7: { pl: "Przyłącza elastyczne 2 × 10 mb", en: "Flexible connections 2 × 10 m", uk: "Гнучкі підключення 2 × 10 м", hy: "Ճկուն միացումներ 2 × 10 մ", ro: "Racorduri flexibile 2 × 10 m" },
  wf_8: { pl: "Osprzęt zabezpieczający w trybie 72h obsługowym", en: "Safety equipment, 72-hour unattended operation", uk: "Захисне обладнання в режимі 72-годинного обслуговування", hy: "Պաշտպանիչ սարքավորում՝ 72-ժամյա սպասարկման ռեժիմում", ro: "Echipamente de siguranță pentru regim de exploatare 72 h" },
  wa_1: { pl: "Ogrzewanie obiektów przemysłowych", en: "Heating of industrial facilities", uk: "Опалення промислових об'єктів", hy: "Արդյունաբերական օբյեկտների ջեռուցում", ro: "Încălzirea obiectivelor industriale" },
  wa_2: { pl: "Zasilanie sieci i instalacji ciepłowniczych", en: "Supplying district heating networks and heating systems", uk: "Живлення мереж та теплових установок", hy: "Ջերմային ցանցերի և կայանքների սնուցում", ro: "Alimentarea rețelelor și instalațiilor de termoficare" },
  wa_3: { pl: "Procesy technologiczne wymagające ciepła", en: "Heat-driven industrial processes", uk: "Технологічні процеси, що потребують тепла", hy: "Ջերմություն պահանջող տեխնոլոգիական պրոցեսներ", ro: "Procese tehnologice care necesită căldură" },
  wa_4: { pl: "Ogrzewanie budynków użyteczności publicznej", en: "Heating of public-utility buildings", uk: "Опалення громадських будівель", hy: "Հանրային շենքերի ջեռուցում", ro: "Încălzirea clădirilor publice" },
  wa_5: { pl: "Realizacja inwestycji i modernizacji", en: "Investment and modernization projects", uk: "Реалізація інвестицій та модернізації", hy: "Ներդրումների և արդիականացման իրականացում", ro: "Realizarea de investiții și modernizări" },
  sf_1: { pl: "Kompletny system w kontenerze", en: "Complete in-container system", uk: "Повна система в контейнері", hy: "Ամբողջական համակարգ կոնտեյներում", ro: "Sistem complet în container" },
  sf_2: { pl: "Kompletny moduł, gotowy do podłączenia", en: "Complete module, ready to connect on site", uk: "Повний модуль, готовий до підключення", hy: "Ամբողջական մոդուլ՝ պատրաստ միացման", ro: "Modul complet, gata de conectare" },
  sf_3: { pl: "Szybki transport i instalacja", en: "Fast transport and installation", uk: "Швидке транспортування та монтаж", hy: "Արագ տեղափոխում և տեղադրում", ro: "Transport și instalare rapide" },
  sf_4: { pl: "Mobilna konstrukcja", en: "Mobile construction", uk: "Мобільна конструкція", hy: "Շարժական կառուցվածք", ro: "Construcție mobilă" },
  sf_5: { pl: "Wysokiej jakości komponenty", en: "High-quality components", uk: "Високоякісні компоненти", hy: "Բարձրորակ բաղադրիչներ", ro: "Componente de înaltă calitate" },
  sf_6: { pl: "Zasilanie gazem ziemnym lub lekkim olejem opałowym", en: "Natural gas or light heating oil supply", uk: "Живлення природним газом або легким мазутом", hy: "Սնուցում բնական գազով կամ թեթև մազութով", ro: "Alimentare cu gaz natural sau combustibil lichid ușor" },
  sf_7: { pl: "Przystosowana do zastosowań przemysłowych", en: "Designed for industrial applications", uk: "Пристосована до промислового застосування", hy: "Հարմարեցված արդյունաբերական կիրառությունների համար", ro: "Adaptată pentru aplicații industriale" },
  sf_8: { pl: "Niezawodna praca", en: "Reliable operation", uk: "Надійна робота", hy: "Հուսալի աշխատանք", ro: "Funcționare fiabilă" },
  sa_1: { pl: "Stałe źródło pary technologicznej", en: "Steady source of process steam", uk: "Постійне джерело технологічної пари", hy: "Տեխնոլոգիական գոլորշու մշտական աղբյուր", ro: "Sursă permanentă de abur tehnologic" },
  sa_2: { pl: "Zasilanie ciągłych procesów produkcyjnych", en: "Continuous supply for production processes", uk: "Живлення безперервних виробничих процесів", hy: "Անընդհատ արտադրական պրոցեսների սնուցում", ro: "Alimentarea proceselor de producție continue" },
  sa_3: { pl: "Przemysł spożywczy", en: "Food industry", uk: "Харчова промисловість", hy: "Սննդի արդյունաբերություն", ro: "Industria alimentară" },
  sa_4: { pl: "Produkcja chemiczna", en: "Chemical production", uk: "Хімічне виробництво", hy: "Քիմիական արտադրություն", ro: "Producție chimică" },
  sa_5: { pl: "Przemysł papierniczy", en: "Paper industry", uk: "Целюлозно-паперова промисловість", hy: "Թղթի արդյունաբերություն", ro: "Industria hârtiei" },
  sa_6: { pl: "Oczyszczanie ścieków", en: "Wastewater treatment", uk: "Очищення стічних вод", hy: "Կեղտաջրերի մաքրում", ro: "Epurarea apelor uzate" },
  ftr_company: { pl: "Spółka", en: "Company", uk: "Компанія", hy: "Ընկերություն", ro: "Companie" },
  ftr_contact: { pl: "Kontakt", en: "Contact", uk: "Контакти", hy: "Կապ", ro: "Contact" },
  ftr_areas: { pl: "Obszary działalności", en: "Business areas", uk: "Сфери діяльності", hy: "Գործունեության ոլորտներ", ro: "Domenii de activitate" },
  ftr_follow: { pl: "Śledź nas", en: "Follow us", uk: "Стежте за нами", hy: "Հետևեք մեզ", ro: "Urmărește-ne" },
  partners_eyebrow: { pl: "Partnerzy", en: "Partners", uk: "Партнери", hy: "Գործընկերներ", ro: "Parteneri" },
  partners_title: { pl: "Partnerzy strategiczni", en: "Strategic partners", uk: "Стратегічні партнери", hy: "Ռազմավարական գործընկերներ", ro: "Parteneri strategici" },
  partners_lead: { pl: "Współpracujemy z liderami branży kotłowej, łącząc sprawdzone technologie z elastycznością mobilnych rozwiązań.", en: "We work with leaders of the boiler industry, combining proven technologies with the flexibility of mobile solutions.", uk: "Співпрацюємо з лідерами котельної галузі, поєднуючи перевірені технології з гнучкістю мобільних рішень.", hy: "Համագործակցում ենք կաթսայաշինության ոլորտի առաջատարների հետ՝ համատեղելով փորձված տեխնոլոգիաները շարժական լուծումների ճկունության հետ։", ro: "Colaborăm cu lideri din industria cazanelor, îmbinând tehnologii verificate cu flexibilitatea soluțiilor mobile." },
  ftr_partners: { pl: "Partnerzy", en: "Partners", uk: "Партнери", hy: "Գործընկերներ", ro: "Parteneri" },
  gas_footnote: { pl: "* w przypadku użytkowania na gaz ziemny", en: "* when running on natural gas", uk: "* у разі використання природного газу", hy: "* բնական գազով աշխատելու դեպքում", ro: "* în cazul utilizării pe gaz natural" },
};

/* ---------- 2. Expose I18N so shared js/i18n.js can apply translations ---------- */
window.I18N = I18N;

/* ---------- 3. Re-render product specs when language changes ---------- */
window.addEventListener('langchange', () => {
  if (window.__currentVariant) renderSpec(window.__currentVariant);
});

/* ---------- 3. Boiler data ---------- */
const WATER_VARIANTS = [
  { id: '190',   label: '190 kW',    capacity: '190 kW',    pressure: '5 bar',  length: '3000 mm',       width: '2438 mm', height: '2770 mm', weightT: '1800 kg',  weightO: '3000 kg',  electric: '4,1 kW',  fuel: 'fuel_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_190kW.pdf', pdfI18n: true },
  { id: '250',   label: '250 kW',    capacity: '250 kW',    pressure: '5 bar',  length: '3000 mm',       width: '2438 mm', height: '2770 mm', weightT: '2000 kg',  weightO: '3550 kg',  electric: '4,1 kW',  fuel: 'fuel_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_250kW.pdf', pdfI18n: true },
  { id: '360',   label: '360 kW',    capacity: '360 kW',    pressure: '5 bar',  length: '3000 mm',       width: '2438 mm', height: '2770 mm', weightT: '2500 kg',  weightO: '3900 kg',  electric: '4,5 kW',  fuel: 'fuel_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_360kW.pdf', pdfI18n: true },
  { id: '500',   label: '500 kW',    capacity: '500 kW',    pressure: '5 bar',  length: '3600 mm',       width: '2438 mm', height: '2770 mm', weightT: '3300 kg',  weightO: '5400 kg',  electric: '7,5 kW',  fuel: 'fuel_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_500kW.pdf', pdfI18n: true },
  { id: '700',   label: '700 kW',    capacity: '700 kW',    pressure: '14 bar', length: '6150 / 6610* mm', width: '2438 mm', height: '2780 mm', weightT: '7200 kg',  weightO: '8700 kg',  electric: '12,5 kW', fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_700kW.pdf', pdfI18n: true },
  { id: '1000',  label: '1000 kW',   capacity: '1000 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2438 mm', height: '2780 mm', weightT: '7800 kg',  weightO: '9700 kg',  electric: '15 kW',   fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_1000kW.pdf', pdfI18n: true },
  { id: '2000',  label: '2000 kW',   capacity: '2000 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2541 mm', height: '2850 mm', weightT: '9000 kg',  weightO: '12000 kg', electric: '16,5 kW', fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_2000kW.pdf', pdfI18n: true },
  { id: '2500',  label: '2500 kW',   capacity: '2500 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2541 mm', height: '3050 mm', weightT: '10300 kg', weightO: '13500 kg', electric: '32 kW',   fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_2500kW.pdf', pdfI18n: true },
  { id: '2700',  label: '2700 kW',   capacity: '2700 kW',   pressure: '14 bar', length: '6150 / 6610* mm', width: '2541 mm', height: '3150 mm', weightT: '11200 kg', weightO: '14200 kg', electric: '32 kW',   fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_wodna_2700kW.pdf', pdfI18n: true },
  { id: '4000',  label: '4000 kW',   capacity: '4000 kW',   pressure: '25 bar', length: '9500 mm',       width: '2800 mm', height: '3000 mm', weightT: '28800 kg', weightO: '35900 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '6500',  label: '6500 kW',   capacity: '6500 kW',   pressure: '27 bar', length: '10300 mm',      width: '3000 mm', height: '3400 mm', weightT: '39800 kg', weightO: '49000 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '10500', label: '10500 kW',  capacity: '10500 kW',  pressure: '22 bar', length: '11700 mm',      width: '3500 mm', height: '3800 mm', weightT: '52000 kg', weightO: '67000 kg', electric: null,      fuel: 'fuel_gas_oil' },
];

const STEAM_VARIANTS = [
  { id: '350',   label: '350 kg/h',   capacity: '350 kg/h',   pressure: '10 bar', length: '6150 mm',  width: '2438 mm', height: '2790 mm', weightT: '7000 kg',  weightO: '8500 kg',  electric: '6 kW',    fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_parowa_350kgh.pdf', pdfI18n: true },
  { id: '1000',  label: '1000 kg/h',  capacity: '1000 kg/h',  pressure: '13 bar', length: '6150 mm',  width: '2438 mm', height: '2790 mm', weightT: '7500 kg',  weightO: '9500 kg',  electric: '7,5 kW',  fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_parowa_1000kgh.pdf', pdfI18n: true },
  { id: '2000',  label: '2000 kg/h',  capacity: '2000 kg/h',  pressure: '13 bar', length: '6150 mm',  width: '2438 mm', height: '2900 mm', weightT: '10000 kg', weightO: '14000 kg', electric: '9,5 kW',  fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_parowa_2000kgh.pdf', pdfI18n: true },
  { id: '2500',  label: '2500 kg/h',  capacity: '2500 kg/h',  pressure: '14 bar', length: '6150 mm',  width: '2438 mm', height: '2800 mm', weightT: '11500 kg', weightO: '16000 kg', electric: '20 kW',   fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_parowa_2500kgh.pdf', pdfI18n: true },
  { id: '4000',  label: '4000 kg/h',  capacity: '4000 kg/h',  pressure: '16 bar', length: '9500 mm',  width: '2438 mm', height: '3200 mm', weightT: '17000 kg', weightO: '25500 kg', electric: '27 kW',   fuel: 'fuel_gas_oil', pdf: 'katalogi/INVERSIS_Kotlownia_parowa_4000kgh.pdf', pdfI18n: true },
  { id: '6000',  label: '6000 kg/h',  capacity: '6000 kg/h',  pressure: '25 bar', length: '9500 mm',  width: '2800 mm', height: '3000 mm', weightT: '28800 kg', weightO: '35900 kg', electric: null,      fuel: 'fuel_gas_oil' },
  { id: '10000', label: '10000 kg/h', capacity: '10000 kg/h', pressure: '27 bar', length: '10300 mm', width: '3000 mm', height: '3400 mm', weightT: '39800 kg', weightO: '49000 kg', electric: null,      fuel: 'fuel_gas_oil' },
];

/* ---------- 4. Render spec table ---------- */
function tr(key) {
  const lang = localStorage.getItem('inversis_lang') || 'pl';
  return (I18N[key] && I18N[key][lang]) || key;
}

const ENQ_BOILER = {
  pl: { subj: 'Zapytanie ofertowe', variant: 'Wariant', intro: 'Dzień dobry,\n\nproszę o ofertę na poniższą konfigurację:', url: 'Strona', regards: 'Pozdrawiam,' },
  en: { subj: 'Request for quotation', variant: 'Variant', intro: 'Hello,\n\nplease send a quote for the configuration below:', url: 'Page', regards: 'Best regards,' },
  uk: { subj: 'Запит на пропозицію', variant: 'Варіант', intro: 'Доброго дня,\n\nпрошу надати комерційну пропозицію щодо наведеної нижче конфігурації:', url: 'Сторінка', regards: 'З повагою,' },
  hy: { subj: 'Հարցում գնառաջարկի', variant: 'Տարբերակ', intro: 'Բարև Ձեզ,\n\nխնդրում եմ տրամադրել առաջարկ ստորև բերված կազմաձևման համար․', url: 'Էջ', regards: 'Հարգանքով,' },
  ro: { subj: 'Cerere de ofertă', variant: 'Variantă', intro: 'Bună ziua,\n\nvă rog să îmi transmiteți o ofertă pentru configurația de mai jos:', url: 'Pagina', regards: 'Cu stimă,' }
};

function updateBoilerEnquiry() {
  const link = document.querySelector('a[data-enquiry]');
  if (!link) return;
  const lang = localStorage.getItem('inversis_lang') || 'pl';
  const t = ENQ_BOILER[lang] || ENQ_BOILER.pl;
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

// Karta katalogowa PDF — dobiera plik w języku strony (PL = oryginał)
// PDF_VER: bumpnij przy każdej regeneracji kart, żeby ominąć cache przeglądarki
const PDF_VER = '2026-07-03';
/* Nazwa, pod jaką plik zapisze się u użytkownika — w jego języku. */
const PDF_NAME_TYPES = {
  wodna:   { pl:'Kotlownia_wodna',            en:'Water_boiler_plant',      uk:'Водогрійна_котельня',   hy:'Ջրատաք_կաթսայատուն',   ro:'Centrala_de_apa_calda' },
  parowa:  { pl:'Kotlownia_parowa',           en:'Steam_boiler_plant',      uk:'Парова_котельня',       hy:'Գոլորշու_կաթսայատուն', ro:'Centrala_cu_abur' },
  magazyn: { pl:'Magazyn_paliwa',             en:'Fuel_storage',            uk:'Сховище_палива',        hy:'Վառելիքի_պահեստ',      ro:'Depozit_de_combustibil' },
  suw:     { pl:'Stacja_uzdatniania_wody',    en:'Water_treatment_station', uk:'Станція_водопідготовки', hy:'Ջրի_մշակման_կայան',    ro:'Statie_de_tratare_a_apei' },
  odgaz:   { pl:'Modul_przygotowania_wody',   en:'Water_treatment_module',  uk:'Модуль_водопідготовки', hy:'Ջրի_մշակման_մոդուլ',   ro:'Modul_de_tratare_a_apei' }
};
const PDF_NAME_OIL  = { pl:'Olejowa', en:'Oil-fired', uk:'Мазутна', hy:'Մազութային', ro:'Pe_combustibil_lichid' };
const PDF_NAME_LANG = { pl:'PL', en:'EN', uk:'UA', hy:'HY', ro:'RO' };

function brochureName(v) {
  const lang = localStorage.getItem('inversis_lang') || 'pl';
  const f = (v.pdf || '').split('/').pop();
  let kind, size, unit, oil = false;
  let m;
  if ((m = f.match(/Kotlownia_wodna_(\d+)kW/i)))       { kind='wodna';   size=m[1]; unit='kW';   oil = +m[1] <= 500; }
  else if ((m = f.match(/Kotlownia_parowa_(\d+)kgh/i))) { kind='parowa';  size=m[1]; unit='kg-h'; }
  else if ((m = f.match(/Magazyn_paliwa_(\d+)m3/i)))    { kind='magazyn'; size=m[1]; unit='m3';   }
  else if ((m = f.match(/SUW_(\d+)m3/i)))               { kind='suw';     size=m[1]; unit='m3';   }
  else if (/Modul_odgazowania/i.test(f))                { kind='odgaz'; }
  if (!kind) return '';
  const parts = ['INVERSIS', PDF_NAME_TYPES[kind][lang] || PDF_NAME_TYPES[kind].pl];
  if (size) parts.push(size, unit);
  if (oil) parts.push(PDF_NAME_OIL[lang] || PDF_NAME_OIL.pl);
  parts.push(PDF_NAME_LANG[lang] || 'PL');
  return parts.join('_') + '.pdf';
}
window.brochureName = brochureName;

function brochureHref(v) {
  const lang = localStorage.getItem('inversis_lang') || 'pl';
  const suf = { pl: '', en: '_EN', uk: '_UA', hy: '_HY', ro: '_RO' }[lang] || '';
  const base = (!suf || !v.pdfI18n) ? v.pdf : v.pdf.replace(/\.pdf$/i, suf + '.pdf');
  return base + '?v=' + PDF_VER;
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

  // Brochure download — pojawia się tylko gdy wariant ma katalog PDF
  const broLink = document.querySelector('a[data-brochure]');
  if (broLink) {
    if (variant.pdf) {
      broLink.href = brochureHref(variant);
      broLink.setAttribute('download', brochureName(variant));
      broLink.hidden = false;
    } else {
      broLink.removeAttribute('href');
      broLink.hidden = true;
    }
  }

  updateBoilerEnquiry();
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
  initAccordion();
  if (document.body.dataset.page === 'water') initPowerButtons(WATER_VARIANTS);
  if (document.body.dataset.page === 'steam') initPowerButtons(STEAM_VARIANTS);
});
