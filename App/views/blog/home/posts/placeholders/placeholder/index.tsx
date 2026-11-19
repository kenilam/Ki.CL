import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, CardHeader, CardTitle, Skeleton } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Placeholder: React.FunctionComponent = () => {
  const { t } = useTranslation('blog');

  return (
    <Card
      className={classNames(
        'kicl-grid-row-span-3',
        'kicl-grid-template-rows-subgrid'
      )}
      is='li'
    >
      <CardHeader
        className={classNames(
          'kicl-grid-row-span-3',
          'kicl-grid-template-rows-subgrid'
        )}
      >
        <CardTitle is='p'>{t('coming_soon')}</CardTitle>
        <Skeleton
          className={classNames('kicl-animation-none', 'kicl-inline-size-md')}
        />
        <Skeleton
          className={classNames('kicl-align-self-start', 'kicl-animation-none')}
        />
      </CardHeader>
    </Card>
  );
};

export { Placeholder };
