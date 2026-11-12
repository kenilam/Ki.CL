import React from 'react';

// Components
import { Animation, Badge, BadgeLabel, Skeleton } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

const Allowance: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };
  const { allowance } = useGenerateContext();

  if (!allowance) {
    return <Skeleton className='kicl-inline-size-md' />;
  }

  const { limit, remaining } = allowance;

  return (
    <Animation>
      <Badge limit={limit} remaining={remaining} size='small'>
        <BadgeLabel>
          {translations.common.t('label', { context: 'allowance' })}
        </BadgeLabel>
        {translations.kineticLight.t('songs_left', { count: remaining })}
      </Badge>
    </Animation>
  );
};

export { Allowance };
