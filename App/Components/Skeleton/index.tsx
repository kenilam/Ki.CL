import React from 'react';
import classNames from 'classnames';

import type { Props } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--skeleton';

/**
 * Pulsing placeholder - API aligned with
 * https://ui.shadcn.com/docs/components/skeleton
 */
const Skeleton = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot='skeleton'
      className={classNames(CLASS_NAME, className)}
      {...rest}
    />
  )
);

Skeleton.displayName = 'Skeleton';

export type { Props as SkeletonProps } from './Spec';
export default Skeleton;
