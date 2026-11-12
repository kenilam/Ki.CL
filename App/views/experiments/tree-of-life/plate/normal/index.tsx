import React from 'react';

// Libraries
import classNames from 'classnames';

// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/plate/constants';

/** Centred, with no wash, as the picture is on a narrow banner. */
const Normal: React.FunctionComponent = () => {
  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-background-position-center',
        'kicl-background-repeat-no-repeat',
        'kicl-background-size-cover',
        'kicl-inset-0',
        'kicl-position-absolute',
        'kicl-z-index-behind'
      )}
    />
  );
};

export { Normal };
