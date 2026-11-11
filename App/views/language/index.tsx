import React from 'react';

// Widgets
import { LanguageSelect, type LanguageSelectProps } from 'design/widgets';

// i18n
import { chooseLanguage } from '@/i18n';

// Hooks
import { useTranslation } from 'design/hooks';
import { useLanguages } from '@/views/use-languages';

const Language: React.FunctionComponent<
  Pick<LanguageSelectProps<string>, 'className' | 'inline' | 'placement'>
> = (props) => {
  const { i18n } = useTranslation();
  const { languages, loading } = useLanguages();

  return (
    <LanguageSelect
      {...props}
      aria-busy={loading}
      languages={languages}
      onValueChange={chooseLanguage}
      value={i18n.language}
    />
  );
};

export { Language };
