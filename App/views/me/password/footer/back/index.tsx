import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePasswordChangeContext } from '@/views/context';

/** Go back is still above while it can be tried again, so only done links back. */
const Back: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { stage } = usePasswordChangeContext();

  if (stage !== 'done') {
    return null;
  }

  return (
    <HyperLink lookLikeButton size='small' to='..' variant='secondary'>
      {t('action', { context: 'back' })}
    </HyperLink>
  );
};

export { Back };
