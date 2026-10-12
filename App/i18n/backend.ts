import type { BackendModule, ResourceKey } from 'i18next';

import { DEFAULT_NAMESPACE } from './constants';

const load = async (
  language: string,
  namespace: string
): Promise<ResourceKey> => {
  try {
    const { loadTranslations } = await import('api/provider');
    const [translation] = await loadTranslations(language, [namespace]);

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

    const { default: bundled } = await import('@/locales/en/common.json');

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
