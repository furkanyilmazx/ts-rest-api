import { tr, en } from '@project/locales';
import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  queryParameter: 'locale',
  staticCatalog: { tr, en },
  api: {
    __: 't',
    __n: 'tn',
  },
});

export default i18n;
