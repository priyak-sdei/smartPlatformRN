import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations/index'; // Import your translations
// import fr from './fr'; // Add more languages as needed

const resources = {
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
