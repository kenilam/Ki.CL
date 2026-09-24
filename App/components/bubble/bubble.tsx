import React from 'react';
import classNames from 'classnames';

import type { BubbleIs, BubbleProps } from './spec';

const CLASS_NAME = 'kicl--components--bubble';

/**
 * One chat message - API aligned with
 * https://ui.shadcn.com/docs/components/base/bubble
 */
const Bubble = React.forwardRef<HTMLElement, BubbleProps>(
  (
    {
      align = 'start',
      children,
      className,
      is = 'div',
      variant = 'default',
      ...rest
    },
    ref
  ) => {
    const Component = is as BubbleIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--variant--${variant}`,
          `${CLASS_NAME}--align--${align}`,
          'kicl-position-relative',
          className
        )}
        data-align={align}
        data-is={is}
        data-slot='bubble'
        data-variant={variant}
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

Bubble.displayName = 'Bubble';

export { Bubble };
