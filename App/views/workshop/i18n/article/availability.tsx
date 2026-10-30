import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

const PARAGRAPHS = ['complete', 'run', 'switcher', 'adding'] as const;

const Availability: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.availability.title')}
        </Heading>
      }
    >
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text is='p' key={paragraph}>
            <Markdown>{t(`article.availability.${paragraph}`)}</Markdown>
          </Text>
        );
      })}
    </Details>
  );
};

export { Availability };
