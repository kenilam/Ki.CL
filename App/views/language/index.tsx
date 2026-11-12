import React from 'react';

// Views
import {
  LanguageSelect,
  type LanguageSelectProps,
} from '@/views/language-select';

// i18n
import { chooseLanguage } from '@/i18n';

// Hooks
import { useTranslation } from 'design/hooks';

const Language: React.FunctionComponent<
  Pick<LanguageSelectProps, 'className' | 'inline' | 'placement'>
> = (props) => {
  const { i18n } = useTranslation();

  return (
    <LanguageSelect
      {...props}
      onValueChange={chooseLanguage}
      value={i18n.language}
    />
  );
};

export { Language };
