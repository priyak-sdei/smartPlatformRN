import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/index'; // Import your translations
import { I18nManager } from 'react-native';
import * as Localization from 'react-native-localize';

const fallbackLocale = 'en';
const systemLocales = Localization.getLocales();

const resources = {
  en: {
    translation: en,
  },
};
const supportedTags = Object.keys(resources);

// Checks to see if the device locale matches any of the supported locales
// Device locale may be more specific and still match (e.g., en-US matches en)
const systemTagMatchesSupportedTags = (deviceTag: string) => {
  const primaryTag = deviceTag.split('-')[0];
  return supportedTags.includes(primaryTag);
};

const pickSupportedLocale: () => Localization.Locale | undefined = () => {
  return systemLocales.find(locale =>
    systemTagMatchesSupportedTags(locale.languageTag),
  );
};

const locale = pickSupportedLocale();

// Need to set RTL ASAP to ensure the app is rendered correctly. Waiting for i18n to init is too late.
if (locale?.languageTag && locale?.isRTL) {
  I18nManager.allowRTL(true);
} else {
  I18nManager.allowRTL(false);
}

export const initI18n = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: locale?.languageCode ?? fallbackLocale,
    fallbackLng: fallbackLocale,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = string;
