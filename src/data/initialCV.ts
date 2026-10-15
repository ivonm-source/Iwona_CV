import { CVData } from '../types/cv';

export const INITIAL_CV_DATA: CVData = {
  personalInfo: {
    fullName: "Jan Kowalski",
    title: "Kierownik Operacyjny / Project Manager",
    email: "jan.kowalski@przyklad.pl",
    phone: "+48 500 000 000",
    location: "ul. Przykładowa 12/4, 00-001 Warszawa",
    birthDate: "1 stycznia 1990 r.",
    showBirthDate: true,
    maritalStatus: "Do uzupełnienia (opcjonalnie)",
    showMaritalStatus: false, // Standard rekrutacyjny zaleca ukrywanie stanu cywilnego
    drivingLicense: "kat. B",
    photoUrl: "", // Pusty szablon - gotowy na wgranie zdjęcia przez użytkownika
    showPhoto: true,
  },
  summary: "Doświadczony kierownik i menedżer z wieloletnim stażem w zarządzaniu operacyjnym, optymalizacji procesów biznesowych oraz budżetowaniu. Skutecznie realizuję cele strategiczne, wdrażam wysokie standardy jakościowe oraz buduję zaangażowane i zmotywowane zespoły zorientowane na sukces organizacji.",
  experience: [
    {
      id: "exp-1",
      position: "Kierownik Operacyjny / Menedżer Projektu",
      company: "Przykładowa Firma Sp. z o.o.",
      location: "Warszawa",
      startDate: "01.2020",
      endDate: "obecnie",
      current: true,
      responsibilities: [
        "Kompleksowe zarządzanie operacyjne i realizacja wyznaczonych planów budżetowych.",
        "Kierowanie zespołem pracowników, rekrutacja, onboarding oraz wdrażanie systemów motywacyjnych.",
        "Optymalizacja wewnętrznych procedur operacyjnych i nadzór nad standardami jakościowymi.",
        "Budowanie długofalowych relacji biznesowych z kluczowymi partnerami i klientami.",
        "Osiąganie wyróżniających wyników w cyklicznych audytach i wskaźnikach KPI."
      ]
    },
    {
      id: "exp-2",
      position: "Specjalista ds. Operacji i Obsługi Klienta",
      company: "Przedsiębiorstwo Handlowo-Usługowe S.A.",
      location: "Kraków",
      startDate: "06.2015",
      endDate: "12.2019",
      current: false,
      responsibilities: [
        "Koordynacja bieżącej obsługi operacyjnej oraz nadzór nad obiegiem dokumentacji handlowej.",
        "Rozliczanie transakcji finansowych, prowadzenie inwentaryzacji okresowych i ciągłych.",
        "Współpraca z działami wewnętrznymi firmy w celu podnoszenia standardów obsługi klienta.",
        "Wdrażanie procedur bezpieczeństwa oraz kontrola stanów magazynowych."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Uniwersytet / Szkoła Wyższa w Warszawie",
      degree: "Magister",
      fieldOfStudy: "Ekonomia i Zarządzanie",
      specialization: "Zarządzanie przedsiębiorstwem",
      thesisTitle: "Optymalizacja procesów biznesowych w nowoczesnej organizacji",
      startDate: "2010",
      endDate: "2015"
    },
    {
      id: "edu-2",
      school: "Zespół Szkół Ponadpodstawowych / Technikum",
      degree: "Technik ekonomista",
      fieldOfStudy: "Finanse i rachunkowość",
      startDate: "2006",
      endDate: "2010"
    }
  ],
  skills: {
    management: [
      "Zarządzanie operacyjne i planowanie budżetu",
      "Kierowanie zespołem, rekrutacja i szkolenia pracowników",
      "Optymalizacja procesów i kontrola wskaźników KPI",
      "Wdrażanie procedur jakościowych oraz standardów BHP",
      "Negocjacje handlowe i budowanie relacji z klientami",
      "Inwentaryzacje i nadzór nad gospodarką magazynową"
    ],
    technical: [
      "Pakiet MS Office (Word, Excel, PowerPoint) – poziom zaawansowany",
      "Obsługa systemów klasy CRM oraz ERP",
      "Systemy kasowo-sprzedażowe (POS) i terminale płatnicze",
      "Prowadzenie elektronicznej dokumentacji handlowej"
    ]
  },
  languages: [
    {
      id: "lang-1",
      language: "Język angielski",
      level: "B2 (średnio zaawansowany)",
      description: "Płynna komunikacja biznesowa i codzienna"
    }
  ],
  softSkills: [
    "Wysoka odpowiedzialność, dokładność i zorientowanie na cele",
    "Umiejętność pracy pod presją czasu oraz w dynamicznym środowisku",
    "Komunikatywność i łatwość budowania relacji interpersonalnych",
    "Ciągła gotowość do rozwoju i podnoszenia kwalifikacji zawodowych",
    "Zdolności analityczne i skrupulatność w rozliczeniach"
  ],
  interests: [
    "Literatura branżowa i psychologia biznesu",
    "Sporty wodne i rekreacja na świeżym powietrzu",
    "Nowe technologie i motoryzacja"
  ],
  gdprClause: "Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).",
  includeFutureRecruitment: false
};

export const STYLE_CORRECTIONS_LOG = [
  {
    category: "Dane osobowe i nagłówek",
    original: "Nazwisko Imię (odwrócona kolejność)",
    improved: "Imię Nazwisko (np. Jan Kowalski)",
    explanation: "W nowoczesnych dokumentach aplikacyjnych stosuje się naturalny, elegancki szyk: Imię Nazwisko."
  },
  {
    category: "Format daty i telefonu",
    original: "01 sierpień 1990r. | 500000000",
    improved: "1 sierpnia 1990 r. | +48 500 000 000",
    explanation: "Poprawna odmiana miesiąca w języku polskim oraz czytelny międzynarodowy format numeru telefonu."
  },
  {
    category: "Stan cywilny",
    original: "Stan cywilny wpisany na stałe",
    improved: "Opcjonalne pole (domyślnie ukryte w CV)",
    explanation: "Zgodnie z Kodeksem Pracy i standardami antydyskryminacyjnymi stan cywilny nie jest wymagany w CV (można go włączyć wedle uznania)."
  },
  {
    category: "Pisownia i styl",
    original: "Niepotrzebne wielkie litery w środku zdań",
    improved: "Zasady poprawnej polskiej ortografii i typografii",
    explanation: "Usunięto niepoprawne wielkie litery przy nazwach specjalizacji i tematach prac."
  },
  {
    category: "Opisy stanowisk",
    original: "Niejasne lub potoczne zwroty (np. 'do nadal')",
    improved: "Jednolity format: '01.2020 – obecnie', konkretne punkty odpowiedzialności",
    explanation: "Zwiększa przejrzystość dokumentu i czytelność dla rekruterów oraz systemów ATS."
  },
  {
    category: "Klauzula RODO",
    original: "Przestarzała klauzula odwołująca się do ustawy z 1997 r. lub konkretnej firmy",
    improved: "Aktualna, uniwersalna klauzula oparta na Rozporządzeniu RODO (UE) 2016/679",
    explanation: "W pełni zgodna z obowiązującymi przepisami prawnymi dla każdego procesu rekrutacyjnego."
  }
];
