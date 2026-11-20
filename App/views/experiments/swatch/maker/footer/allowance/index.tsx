import React from 'react';

// Components
import { Animation, Badge, BadgeLabel } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Allowance: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    swatch: useTranslation('swatch'),
  };

  return (
    <Animation>
      <Badge level='error' size='small'>
        <BadgeLabel>
          {translations.common.t('label', { context: 'allowance' })}
        </BadgeLabel>
        {translations.swatch.t('swatches_left', { count: 0 })}
      </Badge>
    </Animation>
  );
};

export { Allowance };
