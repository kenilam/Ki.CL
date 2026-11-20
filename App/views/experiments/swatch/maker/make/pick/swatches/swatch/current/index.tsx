import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Popover, PopoverHint, PopoverTrigger } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useMatch } from './use-match';

// A bullseye when the swatch is the picked color, an arrow beside it when it's the nearest.
const ICONS = {
  closest: Tb.TbTarget,
  exact: Tb.TbTarget,
};

const Current: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const match = useMatch();

  if (!match) {
    return null;
  }

  const Icon = ICONS[match];
  const label = t('status', { context: match });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Icon
          aria-label={label}
          className={classNames({ 'kicl-color-confirm': match === 'exact' })}
          role='img'
        />
      </PopoverTrigger>
      <PopoverHint aria-hidden>{label}</PopoverHint>
    </Popover>
  );
};

export { Current };
