import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Widgets
import { LanguageSelect } from 'design/widgets';

// i18n
import { chooseLanguage } from '@/i18n';

// Hooks
import { useLanguages } from './use-languages';

const Language: React.FunctionComponent = () => {
  const { i18n } = useTranslation();
  const languages = useLanguages();

  return (
    <LanguageSelect
      languages={languages}
      onValueChange={chooseLanguage}
      value={i18n.language}
    />
  );
};

export { Language };
