import React from 'react';

// Icons
import { Ri } from '@/icons';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as DETAILS } from '@/components/details/constants';

const CLASS_NAME = `${DETAILS}__marker`;

/** Two stacked icons; the open state on `<details>` decides which one shows. */
const Marker: React.FunctionComponent = () => (
  <span aria-hidden className={CLASS_NAME}>
    <Ri.RiSubtractLine
      className={`${CLASS_NAME}-icon ${CLASS_NAME}-icon--closed`}
    />
    <Ri.RiArrowDownSLine
      className={`${CLASS_NAME}-icon ${CLASS_NAME}-icon--open`}
    />
  </span>
);

export { Marker };
