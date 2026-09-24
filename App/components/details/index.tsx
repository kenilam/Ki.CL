import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

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
  ({ children, className, marker = true, summary, ...rest }, ref) => (
    <details
      {...rest}
      className={classNames(CLASS_NAME, className)}
      data-slot='details'
      ref={ref}
    >
      <Layout alignItems='start' display='flex' gap='narrow'>
        <summary className={`${CLASS_NAME}__summary`} data-slot='summary'>
          {summary}
          {marker ? <Marker /> : null}
        </summary>
      </Layout>
      {children}
    </details>
  )
);

Details.displayName = 'Details';

export type { Props as DetailsProps, SummaryProps } from './spec';
export { Details, Marker as DetailsMarker };
