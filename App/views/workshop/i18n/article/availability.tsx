import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Text } from 'design/components';

const PARAGRAPHS = ['complete', 'run', 'switcher'] as const;

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
    </Details>
  );
};

export { Availability };
