import React from 'react';
import classNames from 'classnames';

import type { BubbleReactionsIs, BubbleReactionsProps } from './spec';

const CLASS_NAME = 'kicl--components--bubble__reactions';

/** Small chip that overlaps a corner of the bubble. */
const BubbleReactions = React.forwardRef<HTMLElement, BubbleReactionsProps>(
  (
    {
      align = 'end',
      children,
      className,
      is = 'div',
      side = 'bottom',
      ...rest
    },
    ref
  ) => {
    const Component = is as BubbleReactionsIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--align--${align}`,
          `${CLASS_NAME}--side--${side}`,
          'kicl-position-absolute',
          'kicl-font-size-small',
          className
        )}
        data-align={align}
        data-is={is}
        data-side={side}
        data-slot='bubble-reactions'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

BubbleReactions.displayName = 'BubbleReactions';

export { BubbleReactions };
