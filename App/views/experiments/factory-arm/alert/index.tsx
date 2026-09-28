import React from 'react';

// Components
import { Status } from '@/components';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/**
 * Announces the scene's badges to screen readers. The scene is one picture
 * to them, so the badges over the arm and over a case with no clear path
 * aren't read out; these say the same, and aren't shown.
 */
const Alert: React.FunctionComponent = () => {
  const { skipped, stopped } = useFactoryArmContext();

  return (
    <>
      <Status
        className='kicl-hidden'
        in={stopped}
        level='error'
        message={COPY.stopped.message}
        title={COPY.stopped.title}
      />
      <Status
        className='kicl-hidden'
        in={!!skipped && !stopped}
        level='warning'
        title={COPY.skipped}
      />
    </>
  );
};

export { Alert };
