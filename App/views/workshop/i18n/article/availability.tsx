import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Layout, Text } from 'design/components';

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

const Availability: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.availability.title')}
        </Heading>
      }
    >
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text
            className='kicl-max-inline-size-columns-8'
            is='p'
            key={paragraph}
          >
            {t(`article.availability.${paragraph}`)}
          </Text>
        );
      })}
      <Layout gap='narrow' justifyItems='start'>
        <figure>
          <LanguageSelect languages={LANGUAGES} value='zh-Hant' />
          <figcaption className='kicl-max-inline-size-columns-8'>
            <Text dense is='span'>
              {t('article.availability.figure_caption')}
            </Text>
          </figcaption>
        </figure>
      </Layout>
    </Details>
  );
};

export { Availability };
