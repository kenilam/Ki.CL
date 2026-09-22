import React from 'react';
import classNames from 'classnames';

import type { Props } from './spec';

import './styles.scss';

const CLASS_NAME = 'kicl--components--skeleton';

/**
 * Pulsing placeholder, hidden from assistive tech (pass `aria-hidden={false}`
 * to expose it) - API aligned with
 * https://ui.shadcn.com/docs/components/skeleton
 */
const Skeleton = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => (
    <div
      aria-hidden
      ref={ref}
      data-slot='skeleton'
      className={classNames(CLASS_NAME, className)}
      {...rest}
    />
  )
);

Skeleton.displayName = 'Skeleton';

export type { Props as SkeletonProps } from './spec';
export { Skeleton };
