import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "Workplanetjobs.com": "Workplanetjobs.com",
      "Witaj": "Welcome",
      "Łącznie znaleziono": "Total found",
      "ofert pracy": "job offers",
      "Futurystyczny portal pracy: AI, kreator CV, szybka rekrutacja, panel rekrutera, płatności online.": "Global job portal: AI, CV creator, fast recruitment, recruiter panel, online payments."
    }
  },
  pl: {
    translation: {
      "Workplanetjobs.com": "Workplanetjobs.com",
      "Witaj": "Witaj",
      "Łącznie znaleziono": "Łącznie znaleziono",
      "ofert pracy": "ofert pracy",
      "Futurystyczny portal pracy: AI, kreator CV, szybka rekrutacja, panel rekrutera, płatności online.": "Globalny portal pracy: AI, kreator CV, szybka rekrutacja, panel rekrutera, płatności online."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;