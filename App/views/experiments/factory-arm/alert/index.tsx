import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Status } from '@/components';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { CLASS_NAME, COPY } from '@/views/experiments/factory-arm/constants';

/*
 * A frosted pane, as the image agent's header uses, tinted further so the
 * notice reads over the light floor and whatever the arm is doing behind it.
 */
const PANE = classNames(
  `${CLASS_NAME}__alert`,
  'kicl-backdrop',
  'kicl-border-radius-md',
  'kicl-inset-block-end',
  'kicl-inset-inline-start',
  'kicl-padding-block-narrow',
  'kicl-padding-inline-narrow',
  'kicl-position-fixed',
  'kicl-z-index-floating'
);

/**
 * Says so on the page when the arm has stopped, as well as the red light, and
 * for a moment when it gives a case up because there's no way to it.
 */
const Alert: React.FunctionComponent = () => {
  const { skipped, stopped } = useFactoryArmContext();

  return (
    <>
      <Status
        className={PANE}
        in={stopped}
        level='error'
        message={COPY.stopped.message}
        title={COPY.stopped.title}
      />
      <Status
        className={PANE}
        in={skipped && !stopped}
        level='warning'
        message={COPY.skipped.message}
        title={COPY.skipped.title}
      />
    </>
  );
};

export { Alert };
