import React from 'react';

// Components
import { Details, Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Paragraphs } from './paragraphs';

const Serving: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.serving.title')}
        </Heading>
      }
    >
      <Paragraphs />
    </Details>
  );
};

export { Serving };
