# INVERSIS Group — strona inversis-group.com

Statyczna strona (GitHub Pages, bez kroku budowania) w czterech wersjach językowych:

| Adres | Język |
|---|---|
| `/` (pliki `*.html` w katalogu głównym) | English — wersja domyślna (`x-default`) |
| `/uk/` | українська |
| `/ro/` | română |
| `/hy/` | հայերեն |
| `/pl/` | polski — **tylko zabudowa kontenerowa / produkcja kontraktowa** (`/pl/`) i kontakt (`/pl/kontakt.html`) |

Polska wersja jest celowo ograniczona do oferty zabudowy kontenerowej (produkcja kontraktowa) — oferta kotłowni, energetyki i IT nie występuje po polsku, żeby nie konkurować w wynikach wyszukiwania z partnerem (Selo Energia). `/pl/` jest w klastrze hreflang stron głównych. Pełny stan sprzed zmian = commit `ff297f1`.

## Jak to działa
- Każda strona ma gotową treść w HTML w swoim języku, poprawny `<html lang>`, `<title>`, `meta description`, `canonical` oraz znaczniki `hreflang` do pozostałych wersji.
- Przełącznik języka to zwykłe linki do odpowiednika strony w innym języku.
- `js/i18n.js` tłumaczy tylko elementy dokładane przez skrypty (menu, konfiguratory, galerie) na podstawie słowników `js/i18n-uk-hy.js`, `js/i18n-ro.js`, `js/i18n-extra.js`.
- Na stronach EN użytkownik z przeglądarką ustawioną na ukraiński / rumuński / ormiański widzi dyskretną propozycję przejścia na swoją wersję (bez automatycznego przekierowania).
- `sitemap.xml` i `robots.txt` — zgłoś `https://inversis-group.com/sitemap.xml` w Google Search Console.

## Edycja treści
Tekst zmienia się bezpośrednio w pliku danej wersji językowej, np. `uk/cieplownictwo.html`. Zmiana w jednym języku nie przenosi się na pozostałe.
Ścieżki do zasobów są bezwzględne (`/assets/...`, `/css/...`, `/js/...`, `/katalogi/...`), więc pliki działają w każdym katalogu językowym.
