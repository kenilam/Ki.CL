import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_NAMESPACE, PRELOADED, SOURCE } from './constants';

i18next.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  document.documentElement.dir = i18next.dir(language);
});

let loading: Promise<unknown> | undefined;

/**
 * Settles once the default namespace and the design system's have loaded. A view names its own
 * namespace in `useTranslation`, which suspends into that route's fallback
 * until it arrives. It starts on the first call, after `/env`, and before the
 * session, since `i18nTranslations` runs without one.
 */
const load = () =>
  import('i18n').then(async ({ backend, loadTranslations, rememberedLanguage }) => {
    let lng: string = SOURCE;
    let resources = {};

    // The API answers in the first complete language the visitor accepts, and names it in Content-Language.
    try {
      const { contentLanguage, translations } = await loadTranslations(
        rememberedLanguage() || navigator.language,
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
        backend: {
          // The session gate reports a failed API in these words, so the build keeps a copy.
          fallback: async (_language: string, namespace: string) => {
            if (namespace !== DEFAULT_NAMESPACE) {
              return undefined;
            }

            const { default: bundled } = await import('@/locales/en-US/common.json');

            return bundled;
          },
        },
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
  });

const ready = () => (loading ??= load());

export { ready };
