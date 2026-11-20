import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useExact } from '@/views/experiments/swatch/maker/use-exact';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Constants
import { FORM } from '@/views/experiments/swatch/maker/constants';

const Generate: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const { busy, mode } = useMaker();
  const exact = useExact();

  return (
    <Button
      before={<Tb.TbSparkles aria-hidden />}
      busy={busy}
      disabled={mode === 'pick' && exact}
      form={FORM}
      size='small'
      type='submit'
    >
      {t('action', { context: busy ? 'generating' : 'generate' })}
    </Button>
  );
};

export { Generate };
