import React from 'react';

// Components
import { Status } from '@/components';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

const PLACE =
  'kicl-position-fixed kicl-inset-block-end kicl-inset-inline-start';

/**
 * Says so on the page when the arm has stopped, as well as the red light, and
 * for a moment when it gives a case up because there's no way to it.
 */
const Alert: React.FunctionComponent = () => {
  const { skipped, stopped } = useFactoryArmContext();

  return (
    <>
      <Status
        className={PLACE}
        in={stopped}
        level='error'
        message={COPY.stopped.message}
        title={COPY.stopped.title}
      />
      <Status
        className={PLACE}
        in={skipped && !stopped}
        level='warning'
        message={COPY.skipped.message}
        title={COPY.skipped.title}
      />
    </>
  );
};

export { Alert };
