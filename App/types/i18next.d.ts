import 'i18next';

import type common from '@/locales/en/common.json';
import type resume from '@/locales/en/resume.json';

/** Keys are checked against the English files, which seed the database. */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      resume: typeof resume;
    };
  }
}
