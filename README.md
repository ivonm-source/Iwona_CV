# Profesjonalny Kreator & Szablon CV

Nowoczesna, interaktywna aplikacja przeglądarkowa do prezentacji, edycji i eksportu życiorysu zawodowego (Curriculum Vitae).

## 🚀 Jak wrzucić ten projekt na GitHuba

Wykonaj w terminalu w katalogu projektu następujące polecenia:

```bash
# 1. Zainicjalizuj repozytorium git (jeśli jeszcze nie jest zainicjalizowane)
git init

# 2. Dodaj wszystkie pliki
git add .

# 3. Zrób pierwszy commit
git commit -m "feat: Inicjalizacja profesjonalnego CV z workflow GitHub Actions"

# 4. Zmień nazwę głównej gałęzi na main (standard GitHub)
git branch -M main

# 5. Połącz z Twoim repozytorium na GitHubie (podmień YOUR-USERNAME i REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# 6. Wypchnij pliki na GitHub
git push -u origin main
```

---

## 🌐 Automatyczny Deployment na GitHub Pages

Projekt zawiera gotowy plik workflow **`.github/workflows/deploy.yml`**.

Aby strona automatycznie publikowała się w internecie po każdym pushu:
1. Wejdź w swoje repozytorium na GitHubie.
2. Przejdź do zakładki **Settings** (Ustawienia) $\rightarrow$ **Pages** (w menu po lewej stronie).
3. W sekcji **Build and deployment** $\rightarrow$ **Source** zmień z *Deploy from a branch* na **GitHub Actions**.
4. To wszystko! Przy każdym `git push` workflow automatycznie:
   - Pobierze zależności (`npm install`)
   - Zbuduje wersję produkcyjną (`npm run build`)
   - Opublikuje stronę pod adresem: `https://<TWÓJ-LOGIN>.github.io/<NAZWA-REPOZYTORIUM>/`

---

## 💻 Uruchomienie lokalne

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Zbudowanie wersji produkcyjnej do folderu dist/
npm run build
```

---

## ✨ Kluczowe funkcje aplikacji

- **Wydruk do PDF** – idealnie sformatowany arkusz A4 z ukrywaniem narzędzi edycyjnych.
- **Eksport do Worda (`.doc`)** – plik otwierany w Microsoft Word ze stylami, tabelami i nagłówkami.
- **Zapis i odczyt JSON** – możliwość pobrania kopii zapasowej danych i wczytania jej w dowolnym momencie.
- **Edycja na żywo** – kliknij bezpośrednio w tekst na kartce lub skorzystaj z bocznego formularza.
- **Zarządzanie zdjęciem** – ładowanie własnego zdjęcia metodą przeciągnij i upuść (Drag & Drop), podgląd, opcja ukrycia zdjęcia w CV.
- **3 profesjonalne szablony** (Executive, Klasyczny, Minimalistyczny) oraz 5 palet kolorystycznych.
- **Aktualna klauzula RODO (2024–2026)** z opcją włączenia zgody na przyszłe rekrutacje.
