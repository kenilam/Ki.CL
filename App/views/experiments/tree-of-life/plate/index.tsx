import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import '@/views/experiments/tree-of-life/styles.scss';
import './styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__plate';

/** The banner's picture, for the experiments home. */
const Plate: React.FunctionComponent = () => {
  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-background-position-center',
        'kicl-background-repeat-no-repeat',
        'kicl-background-size-cover',
        'kicl-inset-0',
        'kicl-position-absolute'
      )}
    />
  );
};

export { Plate };
