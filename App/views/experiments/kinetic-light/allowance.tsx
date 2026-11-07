import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Animation,
  Badge,
  BadgeLabel,
  type BadgeProps,
  Skeleton,
} from 'design/components';

// Context
import { useKineticLightContext } from '@/views/experiments/kinetic-light/context';

const Allowance: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };
  const {
    generate: { allowance },
  } = useKineticLightContext();

  if (!allowance) {
    return <Skeleton className='kicl-inline-size-md' />;
  }

  const { limit, remaining } = allowance;

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
        {translations.kineticLight.t('songs_left', { count: remaining })}
      </Badge>
    </Animation>
  );
};

export { Allowance };
