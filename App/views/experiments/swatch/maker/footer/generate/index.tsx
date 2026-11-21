import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useGenerate } from './use-generate';

// Constants
import { FORM } from '@/views/experiments/swatch/maker/constants';

const Generate: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const { busy, disabled } = useGenerate();

  return (
    <Button
      before={<Tb.TbSparkles aria-hidden />}
      busy={busy}
      disabled={disabled}
      form={FORM}
      size='small'
      type='submit'
    >
      {t('action', { context: busy ? 'generating' : 'generate' })}
    </Button>
  );
};

export { Generate };
