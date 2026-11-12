import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as PLATE } from '@/views/experiments/tree-of-life/plate/constants';

const CLASS_NAME = `${PLATE}--default`;

/** To the left, under a blurred wash, as the picture is on a wide banner. */
const Default: React.FunctionComponent = () => {
  return (
    <span
      aria-hidden
      className={classNames(
        PLATE,
        CLASS_NAME,
        'kicl-background-repeat-no-repeat',
        'kicl-background-size-cover',
        'kicl-inset-0',
        'kicl-position-absolute',
        'kicl-z-index-behind'
      )}
    />
  );
};

export { Default };
