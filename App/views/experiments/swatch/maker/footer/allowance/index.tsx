import React from 'react';

// API
import { Kicl_SwatchAllowanceDocument, useQuery } from 'api/client';

// Components
import {
  Animation,
  Badge,
  BadgeLabel,
  type BadgeProps,
  Skeleton,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Allowance: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    swatch: useTranslation('swatch'),
  };
  const { data } = useQuery(Kicl_SwatchAllowanceDocument);

  if (!data) {
    return <Skeleton className='kicl-inline-size-md' />;
  }

  const { limit, remaining } = data.swatchAllowance;

  let level: BadgeProps['level'] = 'confirm';

  if (remaining <= limit / 2) {
    level = 'warning';
  }

  if (remaining <= 1) {
    level = 'error';
  }

  return (
    <Animation>
      <Badge level={level} size='small'>
        <BadgeLabel>
          {translations.common.t('label', { context: 'allowance' })}
        </BadgeLabel>
        {translations.swatch.t('swatches_left', { count: remaining })}
      </Badge>
    </Animation>
  );
};

export { Allowance };
