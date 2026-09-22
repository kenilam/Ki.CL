import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { Props } from './spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Partials
import { Marker } from './marker';

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
        <Marker />
      </summary>
      {children}
    </details>
  )
);

Details.displayName = 'Details';

export type { Props as DetailsProps, SummaryProps } from './spec';
export { Details };
