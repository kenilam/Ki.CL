import React from 'react';

// Components
import { Popover, PopoverHint, PopoverTrigger } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSpent } from '@/views/experiments/swatch/use-spent';

// Above the option's own input, so hovering or pressing the disabled option shows why.
const UploadOption: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const spent = useSpent();
  const label = t('mode', { context: 'upload' });

  if (!spent) {
    return label;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className='kicl-position-relative'>{label}</span>
      </PopoverTrigger>
      <PopoverHint>{t('hint', { context: 'spent' })}</PopoverHint>
    </Popover>
  );
};

export { UploadOption };
