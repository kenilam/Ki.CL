import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import type { AcceptLanguage } from 'api/provider';

import { backend } from './backend';

import { ACCEPT_LANGUAGE, DEFAULT_NAMESPACE, PRELOADED } from './constants';

const remembered = () => {
  try {
    return localStorage.getItem(ACCEPT_LANGUAGE) ?? '';
  } catch {
    return '';
  }
};

const chooseLanguage = (acceptLanguage: AcceptLanguage) => {
  try {
    localStorage.setItem(ACCEPT_LANGUAGE, acceptLanguage);
  } catch (error) {
    console.warn(error);
  }

  return i18next.changeLanguage(acceptLanguage);
};

i18next.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  document.documentElement.dir = i18next.dir(language);
});

/**
 * Settles once the default namespace and the design system's have loaded. A view names its own
 * namespace in `useTranslation`, which suspends into that route's fallback
 * until it arrives.
 */
const ready = import('api/provider').then(
  async ({ AcceptLanguage, loadTranslations }) => {
    let lng: string = AcceptLanguage.EnUs;
    let resources = {};
    let choice = remembered();

    // A choice of a language the site no longer has is forgotten.
    if (
      choice &&
      !Object.values(AcceptLanguage).some((acceptLanguage) => {
        return acceptLanguage === choice;
      })
    ) {
      choice = '';

      try {
        localStorage.removeItem(ACCEPT_LANGUAGE);
      } catch (error) {
        console.warn(error);
      }
    }

    // The API answers in the first fully translated language the visitor accepts, and names it in Content-Language.
    try {
      const { contentLanguage, translations } = await loadTranslations(
        choice || navigator.language,
        [DEFAULT_NAMESPACE]
      );

      lng = contentLanguage.split(',')[0]?.trim() || lng;
      resources = {
        [lng]: Object.fromEntries(
          translations.map(({ namespace, resources: bundle }) => {
            return [namespace, bundle];
          })
        ),
      };
    } catch (error) {
      console.error(error);
    }

    return i18next
      .use(backend)
      .use(initReactI18next)
      .init({
        defaultNS: DEFAULT_NAMESPACE,
        fallbackLng: false,
        // React escapes what it renders.
        interpolation: { escapeValue: false },
        load: 'currentOnly',
        lng,
        ns: PRELOADED,
        partialBundledLanguages: true,
        resources,
      });
  }
);

export { chooseLanguage, ready };
