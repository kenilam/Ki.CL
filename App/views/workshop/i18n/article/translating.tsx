import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Markdown, Text } from 'design/components';

const PARAGRAPHS = [
  'job',
  'prompt',
  'tokens',
  'plurals',
  'notes',
  'providers',
] as const;

const Translating: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <>
      <Heading is='h3' lookLike='h2'>
        {t('article.translating.title')}
      </Heading>
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text
            className='kicl-max-inline-size-columns-8'
            is='p'
            key={paragraph}
          >
            <Markdown>{t(`article.translating.${paragraph}`)}</Markdown>
          </Text>
        );
      })}
    </>
  );
};

export { Translating };
