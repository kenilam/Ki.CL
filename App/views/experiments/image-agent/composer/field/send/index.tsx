import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { InputGroupButton } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useComposerContext } from '@/views/experiments/image-agent/composer/context';

const Send: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { loading } = useComposerContext();

  return (
    <InputGroupButton
      aria-label={t('action', { context: 'send' })}
      busy={loading}
      type='submit'
      variant='ghost'
    >
      <Tb.TbCornerLeftUp aria-hidden className='kicl-rtl-mirror' />
    </InputGroupButton>
  );
};

export { Send };
