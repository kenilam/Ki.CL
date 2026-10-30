import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Widgets
import { LanguageSelect } from 'design/widgets';

// API
import {
  AcceptLanguage,
  Kicl_AcceptLanguagesUpdatedDocument,
  useSubscription,
} from 'api/provider';

// i18n
import { chooseLanguage } from '@/i18n';

const Language: React.FunctionComponent = () => {
  const { i18n } = useTranslation();
  const { data } = useSubscription(Kicl_AcceptLanguagesUpdatedDocument);

  const value = Object.values(AcceptLanguage).find((acceptLanguage) => {
    return acceptLanguage === i18n.language;
  });

  const languages =
    data?.AcceptLanguagesUpdated ??
    Object.values(AcceptLanguage).map((acceptLanguage) => {
      return { acceptLanguage };
    });

  return (
    <LanguageSelect
      languages={languages}
      onValueChange={chooseLanguage}
      value={value}
    />
  );
};

export { Language };
