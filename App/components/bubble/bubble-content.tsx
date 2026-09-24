import React from 'react';
import classNames from 'classnames';

import type { BubbleContentIs, BubbleContentProps } from './spec';

const CLASS_NAME = 'kicl--components--bubble__content';

const BubbleContent = React.forwardRef<HTMLElement, BubbleContentProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as BubbleContentIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(CLASS_NAME, 'kicl-line-height', className)}
        data-is={is}
        data-slot='bubble-content'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

BubbleContent.displayName = 'BubbleContent';

export { BubbleContent };
