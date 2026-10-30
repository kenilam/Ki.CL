import i18next, { type BackendModule, type ResourceKey } from 'i18next';

import { DEFAULT_NAMESPACE } from './constants';

const load = async (
  language: string,
  namespace: string
): Promise<ResourceKey> => {
  try {
    const { loadTranslations } = await import('api/provider');
    const { contentLanguage, translations } = await loadTranslations(language, [
      namespace,
    ]);
    const [translation] = translations;
    const shown = contentLanguage.split(',')[0]?.trim();

    // A language that stopped being complete is answered in the visitor's next one. Switch to it once this load is stored, so the switcher shows what the page shows.
    if (shown && shown !== language) {
      setTimeout(() => {
        void i18next.changeLanguage(shown);
      });
    }

    if (translation) {
      return translation.resources;
    }

    throw new Error(`No ${language}/${namespace} in the database.`);
  } catch (error) {
    if (namespace !== DEFAULT_NAMESPACE) {
      throw error;
    }

    // The session gate reports a failed API in these words, so the build keeps a copy.
    console.error(error);

    const { default: bundled } = await import('@/locales/en-US/common.json');

    return bundled;
  }
};

/** Reads a namespace from the database, through the API remote. */
const backend: BackendModule = {
  type: 'backend',
  init: () => undefined,
  read: (language, namespace, callback) => {
    load(language, namespace).then(
      (resources) => callback(null, resources),
      (error: Error) => callback(error, null)
    );
  },
};

export { backend };
