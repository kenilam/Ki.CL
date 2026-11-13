import React from 'react';

// Components
import { Details, List } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Limit } from './limit';

// Constants
import { LIMITS } from './constants';

const Limits: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.limits.title')}>
      <List gap='narrower' listStyleType='disc'>
        {LIMITS.map((limit) => {
          return <Limit limit={limit} key={limit} />;
        })}
      </List>
    </Details>
  );
};

export { Limits };
