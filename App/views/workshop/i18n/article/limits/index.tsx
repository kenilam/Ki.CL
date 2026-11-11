import React from 'react';

// Components
import { Details, Heading, List } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Limit } from './limit';

// Constants
import { LIMITS } from './constants';

const Limits: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.limits.title')}
        </Heading>
      }
    >
      <List gap='narrower' listStyleType='disc'>
        {LIMITS.map((limit) => {
          return <Limit limit={limit} key={limit} />;
        })}
      </List>
    </Details>
  );
};

export { Limits };
