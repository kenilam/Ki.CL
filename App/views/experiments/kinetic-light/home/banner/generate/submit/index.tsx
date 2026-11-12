import React, { useEffect, useRef } from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, useWatch } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

const Submit: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { busy, form } = useGenerateContext();
  const button = useRef<HTMLButtonElement>(null);
  const file = useWatch({ control: form.control, name: 'file' });

  useEffect(() => {
    if (!file) {
      return;
    }

    button.current?.focus({ focusVisible: true });
  }, [file]);

  return (
    <Button
      before={<Tb.TbSparkles aria-hidden />}
      busy={busy}
      ref={button}
      size='small'
      type='submit'
    >
      {t('action', { context: busy ? 'generating' : 'generate' })}
    </Button>
  );
};

export { Submit };
