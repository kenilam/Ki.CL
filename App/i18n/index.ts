import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { backend } from './backend';

import { DEFAULT_NAMESPACE, LANGUAGE } from './constants';

/**
 * Settles once the default namespace has loaded. A view names its own
 * namespace in `useTranslation`, which suspends into that route's fallback
 * until it arrives.
 */
const ready = i18next
  .use(backend)
  .use(initReactI18next)
  .init({
    defaultNS: DEFAULT_NAMESPACE,
    // React escapes what it renders.
    interpolation: { escapeValue: false },
    lng: LANGUAGE,
    ns: [DEFAULT_NAMESPACE],
    supportedLngs: [LANGUAGE],
  });

export { ready };
