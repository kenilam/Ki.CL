import React, { useEffect, useRef } from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { InputGroupButton, useWatch } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

const Submit: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { busy, cooling, form, spent } = useGenerateContext();
  const button = useRef<HTMLButtonElement>(null);
  const file = useWatch({ control: form.control, name: 'file' });

  useEffect(() => {
    if (!file) {
      return;
    }

    button.current?.focus({ focusVisible: true });
  }, [file]);

  return (
    <InputGroupButton
      aria-label={t('action', { context: 'generate' })}
      block
      disabled={!file || busy || spent || cooling}
      ref={button}
      type='submit'
      variant='primary'
    >
      {busy ? (
        <Tb.TbReload aria-hidden className='is-revolving' />
      ) : (
        <Tb.TbSparkles aria-hidden />
      )}
    </InputGroupButton>
  );
};

export { Submit };
