import React from 'react';
import classNames from 'classnames';

import { Ri } from '@/Icons';

import type { Props } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--details';

/**
 * Native disclosure. Open/close is pure CSS via `::details-content`
 * (`content-visibility` + `allow-discrete`). Children own their own layout.
 */
const Details = React.forwardRef<HTMLDetailsElement, Props>(
  ({ children, className, summary, ...rest }, ref) => (
    <details
      {...rest}
      className={classNames(CLASS_NAME, className)}
      data-slot='details'
      ref={ref}
    >
      <summary className={`${CLASS_NAME}__summary`} data-slot='summary'>
        {summary}
        <span aria-hidden className={`${CLASS_NAME}__marker`}>
          <Ri.RiSubtractLine
            className={`${CLASS_NAME}__marker-icon ${CLASS_NAME}__marker-icon--closed`}
          />
          <Ri.RiArrowDownSLine
            className={`${CLASS_NAME}__marker-icon ${CLASS_NAME}__marker-icon--open`}
          />
        </span>
      </summary>
      {children}
    </details>
  )
);

Details.displayName = 'Details';

export type { Props as DetailsProps, SummaryProps } from './Spec';
export default Details;
