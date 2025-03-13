import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishLang from './locales/en/en.json'
import finnishLang from './locales/fi/fi.json'

const resources = {
  en: {
    translation: englishLang
  },
  fi: {
    translation: finnishLang
  }
};
export const currentLanguage = localStorage.getItem('language') || 'fi'
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fi',
    lng: currentLanguage,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;