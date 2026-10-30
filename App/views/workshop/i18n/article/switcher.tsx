import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// API
import { loadTranslations } from 'api/provider';

// Components
import { Card, Layout, Text } from 'design/components';

// Widgets
import { LanguageSelect } from 'design/widgets';

// Hooks
import { useLanguages } from '@/views/language/use-languages';

const Switcher: React.FunctionComponent = () => {
  const { i18n, t } = useTranslation('internationalisation');
  const languages = useLanguages();
  const [value, setValue] = useState<string>();
  const [preview, setPreview] = useState<{
    contentLanguage: string;
    text: string;
  } | null>(null);

  const choose = async (acceptLanguage: string) => {
    setValue(acceptLanguage);

    const { contentLanguage, translations } = await loadTranslations(
      acceptLanguage,
      ['internationalisation']
    );
    const [translation] = translations;

    if (!translation) {
      return;
    }

    const { article } = translation.resources as {
      article: { switcher_preview: string };
    };

    setPreview({
      contentLanguage: contentLanguage.split(',')[0].trim(),
      text: article.switcher_preview,
    });
  };

  return (
    <Layout justifyItems='start'>
      <figure>
        <Layout gap='narrow' justifyItems='start'>
          <Card
            className={classNames(
              'kicl-inline-size-full',
              'kicl-max-inline-size-columns-8'
            )}
            is='section'
            variant='secondary'
          >
            <Layout
              alignItems='center'
              autoFlow='column'
              gap='narrow'
              justifyContent='start'
            >
              <Text is='p'>
                <LanguageSelect
                  languages={languages}
                  onValueChange={choose}
                  value={value ?? i18n.language}
                />
                <output lang={preview?.contentLanguage ?? i18n.language}>
                  {preview?.text ?? t('article.switcher_preview')}
                </output>
              </Text>
            </Layout>
          </Card>
        </Layout>
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
