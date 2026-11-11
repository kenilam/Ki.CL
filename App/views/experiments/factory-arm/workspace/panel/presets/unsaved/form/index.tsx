import React from 'react';

// Components
import { Button, Input } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

// Partials
import { useName } from './use-name';

const Form: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { next } = usePresetsContext();
  const { name, setName, submit } = useName();

  return (
    <form
      aria-label={t('label', { context: 'unsaved' })}
      className='kicl-inline-size-full'
      onSubmit={submit}
    >
      <Input
        aria-label={t('label', { context: 'preset_name' })}
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder={next}
        value={name}
      />
      <Button type='submit' size='small'>
        {t('action', { context: 'save' })}
      </Button>
    </form>
  );
};

export { Form };
