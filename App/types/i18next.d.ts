import 'i18next';

import type common from '@/locales/en/common.json';
import type home from '@/locales/en/home.json';
import type resume from '@/locales/en/resume.json';

/** Keys are checked against the English files, which seed the database. */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      home: typeof home;
      resume: typeof resume;
    };
  }
}
