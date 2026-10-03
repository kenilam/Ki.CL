import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as DETAILS } from '@/components/details/constants';

const CLASS_NAME = `${DETAILS}__marker`;

/** Two stacked icons; the open state on `<details>` decides which one shows. */
const Marker: React.FunctionComponent = () => (
  <span aria-hidden className={classNames(CLASS_NAME, 'kicl-display-grid')}>
    <Ri.RiSubtractLine
      className={classNames(
        `${CLASS_NAME}-icon`,
        `${CLASS_NAME}-icon--closed`,
        'kicl-block-size-full',
        'kicl-inline-size-full'
      )}
    />
    <Ri.RiArrowDownSLine
      className={classNames(
        `${CLASS_NAME}-icon`,
        `${CLASS_NAME}-icon--open`,
        'kicl-block-size-full',
        'kicl-inline-size-full'
      )}
    />
  </span>
);

export { Marker };
