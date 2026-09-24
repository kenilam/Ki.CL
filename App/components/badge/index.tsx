import React from 'react';
import classNames from 'classnames';

//Components
import { Layout } from '@/components/layout';

import type { BadgeIs, Props } from './spec';
import { BadgeLabel } from './badge-label';

import './styles.scss';

const CLASS_NAME = 'kicl--components--badge';

/**
 * Compact label chip - API aligned with
 * https://ui.shadcn.com/docs/components/base/badge
 */
const Badge = React.forwardRef<HTMLElement, Props>(
  (
    {
      children,
      className,
      is = 'span',
      rounded,
      size,
      variant = 'default',
      ...rest
    },
    ref
  ) => {
    const Component = is as BadgeIs;

    return (
      <Layout
        alignContent='center'
        alignItems='center'
        autoFlow='column'
        display='inline-grid'
        gap='narrower'
        justifyContent='center'
        justifyItems='center'
      >
        <Component
          // Discriminated `Props` collapse to a host-specific attrs bag at call
          // sites; the implementation spreads the residual host attrs.
          {...(rest as React.HTMLAttributes<HTMLElement>)}
          className={classNames(
            CLASS_NAME,
            `${CLASS_NAME}--variant--${variant}`,
            {
              [`${CLASS_NAME}--size--${size}`]: size,
              [`kicl-border-radius-sm`]: !rounded,
              [`kicl-border-radius-${size === 'small' ? 'lg' : 'xl'}`]: rounded,
              'kicl-font-size-small': size !== 'large' && size !== 'small',
              'kicl-font-size-smaller': size === 'small',
              'kicl-font-size': size === 'large',
            },
            'kicl-font-weight',
            'kicl-line-height-narrow',
            className
          )}
          data-is={is}
          ref={ref as never}
        >
          {children}
        </Component>
      </Layout>
    );
  }
);

Badge.displayName = 'Badge';

export type {
  Props as BadgeProps,
  BadgeIs,
  BadgeSize,
  BadgeLabelProps,
  BadgeVariant,
} from './spec';
export { BADGE_VARIANTS, BADGE_SIZES } from './spec';
export { BadgeLabel, Badge };
