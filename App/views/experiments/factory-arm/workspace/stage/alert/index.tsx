import React from 'react';

// Components
import { Status } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useNoticesContext } from '@/views/experiments/factory-arm/workspace/notices-context';

/**
 * Announces the scene's badges to screen readers. The scene is one picture
 * to them, so the badges over the arm and over a case with no clear path
 * aren't read out; these say the same, and aren't shown.
 */
const Alert: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { skipped, stopped } = useNoticesContext();

  return (
    <>
      <Status
        className='kicl-hidden'
        in={stopped}
        level='error'
        message={t('stopped', { context: 'message' })}
        title={t('stopped', { context: 'title' })}
      />
      <Status
        className='kicl-hidden'
        in={!!skipped && !stopped}
        level='warning'
        title={t('skipped')}
      />
    </>
  );
};

export { Alert };
