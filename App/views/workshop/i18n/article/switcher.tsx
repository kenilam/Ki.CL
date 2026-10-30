import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Layout, Text } from 'design/components';

// Widgets
import { LanguageSelect } from 'design/widgets';

const LANGUAGES = [
  { acceptLanguage: 'de', complete: false },
  { acceptLanguage: 'en-US', complete: true },
  { acceptLanguage: 'es', complete: false },
  { acceptLanguage: 'fr', complete: true },
  { acceptLanguage: 'zh-Hans', complete: true },
  { acceptLanguage: 'zh-Hant', complete: true, translating: true },
];

const Switcher: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');
  const [value, setValue] = useState('zh-Hant');

  return (
    <Layout gap='narrow' justifyItems='start'>
      <figure>
        <LanguageSelect
          languages={LANGUAGES}
          onValueChange={setValue}
          value={value}
        />
        <figcaption className='kicl-max-inline-size-columns-8'>
          <Text dense is='span'>
            {t('article.switcher_caption')}
          </Text>
        </figcaption>
      </figure>
    </Layout>
  );
};

export { Switcher };
