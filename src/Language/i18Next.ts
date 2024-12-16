import english from './locales/en/english.json';
import arabic from './locales/ar/arabic.json';

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';

export const defaultNS = 'ns1';
export const resources = {
  en: {ns1: english},
  ar: {ns1: arabic},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: I18nManager.isRTL ? 'ar' : 'en',
  defaultNS,
  resources,
});

export default i18next;
