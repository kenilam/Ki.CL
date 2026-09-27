import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Status } from '@/components';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { COPY, PANE } from '@/views/experiments/factory-arm/constants';

const CORNER = classNames(
  PANE,
  'kicl-inset-block-end',
  'kicl-inset-inline-start',
  'kicl-position-fixed',
  'kicl-z-index-floating'
);

/**
 * Says so on the page when the arm has stopped, as well as the red light.
 * The notice for a case with no clear path shows over that case in the
 * scene, which screen readers take as one picture, so it's announced here.
 */
const Alert: React.FunctionComponent = () => {
  const { skipped, stopped } = useFactoryArmContext();

  return (
    <>
      <Status
        className={CORNER}
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
