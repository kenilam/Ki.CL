import React from 'react';
import classNames from 'classnames';

import type { BubbleGroupIs, BubbleGroupProps } from './spec';

const CLASS_NAME = 'kicl--components--bubble__group';

const BubbleGroup = React.forwardRef<HTMLElement, BubbleGroupProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as BubbleGroupIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(CLASS_NAME, className)}
        data-is={is}
        data-slot='bubble-group'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

BubbleGroup.displayName = 'BubbleGroup';

export { BubbleGroup };
