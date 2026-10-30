import { useTranslation } from 'react-i18next';

import {
  Kicl_AcceptLanguagesUpdatedDocument,
  useSubscription,
} from 'api/provider';

const useLanguages = () => {
  const { i18n } = useTranslation();
  const { data } = useSubscription(Kicl_AcceptLanguagesUpdatedDocument, {
    context: { queryDeduplication: false },
  });

  return (
    data?.AcceptLanguagesUpdated ?? [
      { acceptLanguage: i18n.language, complete: true },
    ]
  );
};

export { useLanguages };
