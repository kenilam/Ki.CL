import { useTranslation } from 'react-i18next';

import {
  Kicl_AcceptLanguagesUpdatedDocument,
  useSubscription,
} from 'api/provider';

const useLanguages = () => {
  const { i18n } = useTranslation();
  const { data, loading } = useSubscription(
    Kicl_AcceptLanguagesUpdatedDocument,
    {
      context: { queryDeduplication: false },
    }
  );

  return {
    languages: data?.acceptLanguagesUpdated ?? [
      { acceptLanguage: i18n.language, complete: true },
    ],
    loading,
  };
};

export { useLanguages };
