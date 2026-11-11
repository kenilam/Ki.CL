import {
  Kicl_AcceptLanguagesUpdatedDocument,
  useSubscription,
} from 'api/provider';

// Hooks
import { useTranslation } from 'design/hooks';

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
