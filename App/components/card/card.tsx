import React from 'react';
import classNames from 'classnames';

import { Layout } from '@/components/layout';

import type { CardIs, CardProps } from './spec';

const CLASS_NAME = 'kicl--components--card';

/**
 * Surface container - API aligned with
 * https://ui.shadcn.com/docs/components/base/card
 */
const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      children,
      className,
      is = 'div',
      size = 'default',
      level,
      variant = 'default',
      ...rest
    },
    ref
  ) => {
    const Component = is as CardIs;

    // A column of its parts, packed to the top: a card taller than its parts doesn't space them out.
    return (
      <Layout
        alignContent='start'
        gap={size === 'xs' || size === 'sm' ? 'narrow' : 'normal'}
        ref={ref}
      >
        <Component
          {...(rest as React.HTMLAttributes<HTMLElement>)}
          className={classNames(
            CLASS_NAME,
            `${CLASS_NAME}--size--${size}`,
            `${CLASS_NAME}--variant--${variant}`,
            level && `${CLASS_NAME}--level--${level}`,
            typeof size === 'number'
              ? `kicl-inline-size-columns-${size}`
              : size !== 'default' &&
                  size !== 'fit' &&
                  `kicl-inline-size-${size}`,
            className
          )}
          data-is={is}
          data-size={size}
          data-level={level}
          data-variant={variant}
          data-slot='card'
        >
          {children}
        </Component>
      </Layout>
    );
  }
);

Card.displayName = 'Card';

export { Card };
