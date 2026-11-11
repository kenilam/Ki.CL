import React from 'react';

// Components
import { Status } from 'design/components';

// Helper
import { GetErrorCode } from '@/helper';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context';

// Hooks
import { useTranslation } from 'design/hooks';

/** The conversation could not be loaded. */
const Failure: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { error } = useThreadContext();
  const limited = GetErrorCode(error) === 'TOO_MANY_REQUESTS';
  const context = limited ? 'limited' : 'unreachable';

  return (
    <Status
      in
      headingLevel='h2'
      level={limited ? 'warning' : 'error'}
      message={t('error', { context })}
      title={t('title', { context })}
    />
  );
};

export { Failure };
