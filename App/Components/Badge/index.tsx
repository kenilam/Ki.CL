import React from 'react';
import classNames from 'classnames';

import type { BadgeIs, Props } from './Spec';
import BadgeLabel from './BadgeLabel';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--badge';

/**
 * Compact label chip — API aligned with
 * https://ui.shadcn.com/docs/components/base/badge
 */
const Badge = React.forwardRef<HTMLElement, Props>(
  ({ children, className, is = 'span', variant = 'default', ...rest }, ref) => {
    const Component = is as BadgeIs;

    return (
      <Component
        // Discriminated `Props` collapse to a host-specific attrs bag at call
        // sites; the implementation spreads the residual host attrs.
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--variant--${variant}`,
          'kicl-font-weight',
          'kicl-line-height-narrow',
          className
        )}
        data-is={is}
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

Badge.displayName = 'Badge';

export type {
  Props as BadgeProps,
  BadgeIs,
  BadgeLabelProps,
  BadgeVariant,
} from './Spec';
export { BADGE_VARIANTS } from './Spec';
export { BadgeLabel };
export default Badge;
