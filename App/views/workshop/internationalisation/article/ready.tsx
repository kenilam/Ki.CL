import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Widgets
import { LanguageSelect } from 'design/widgets';

const PARAGRAPHS = ['complete', 'run', 'switcher'] as const;

const LANGUAGES = [
  { acceptLanguage: 'de', complete: false },
  { acceptLanguage: 'en-US', complete: true },
  { acceptLanguage: 'es', complete: false },
  { acceptLanguage: 'fr', complete: true },
  { acceptLanguage: 'zh-Hans', complete: true },
  { acceptLanguage: 'zh-Hant', complete: true, translating: true },
];

const Ready: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <>
      <Heading is='h3' lookLike='h2'>
        {t('article.ready.title')}
      </Heading>
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text is='p' key={paragraph}>
            {t(`article.ready.${paragraph}`)}
          </Text>
        );
      })}
      <Layout gap='narrow' justifyItems='start'>
        <figure>
          <LanguageSelect languages={LANGUAGES} value='zh-Hant' />
          <figcaption>
            <Text dense is='span'>
              {t('article.ready.figure_caption')}
            </Text>
          </figcaption>
        </figure>
      </Layout>
    </>
  );
};

export { Ready };
