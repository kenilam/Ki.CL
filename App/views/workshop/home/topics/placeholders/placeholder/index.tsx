import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, CardHeader, CardTitle, Skeleton } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** A topic still to be written: the shape of a card, standing still. */
const Placeholder: React.FunctionComponent = () => {
  const { t } = useTranslation('workshop');

  return (
    <Card
      className={classNames(
        'kicl-grid-row-span-3',
        'kicl-grid-template-rows-subgrid'
      )}
      is='li'
    >
      <Skeleton
        className={classNames(
          'kicl-animation-none',
          'kicl-aspect-ratio-video',
          'kicl-border-radius-sm'
        )}
      />
      <CardHeader
        className={classNames(
          'kicl-grid-row-span-2',
          'kicl-grid-template-rows-subgrid'
        )}
      >
        <CardTitle is='p'>{t('coming_soon')}</CardTitle>
        {/* One line at the top of its row, however tall the row is. */}
        <Skeleton
          className={classNames('kicl-align-self-start', 'kicl-animation-none')}
        />
      </CardHeader>
    </Card>
  );
};

export { Placeholder };
