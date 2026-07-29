import React from 'react';
import classNames from 'classnames';

import type { CardIs, CardProps } from './Spec';

const CLASS_NAME = 'kicl--components--card';

/**
 * Surface container — API aligned with
 * https://ui.shadcn.com/docs/components/base/card
 */
const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ children, className, is = 'div', size = 'default', ...rest }, ref) => {
    const Component = is as CardIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--size--${size}`,
          size !== 'default' && `kicl-inline-size-${size}`,
          className
        )}
        data-is={is}
        data-size={size}
        data-slot='card'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;
