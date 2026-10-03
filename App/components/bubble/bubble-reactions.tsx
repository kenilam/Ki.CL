import React from 'react';
import classNames from 'classnames';

import { Layout } from '@/components/layout';

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
      <Layout alignItems='center' autoFlow='column' gap='narrowest' ref={ref}>
        <Component
          {...(rest as React.HTMLAttributes<HTMLElement>)}
          className={classNames(
            CLASS_NAME,
            `${CLASS_NAME}--align--${align}`,
            `${CLASS_NAME}--side--${side}`,
            'kicl-border-radius-lg',
            'kicl-font-size-small',
            'kicl-position-absolute',
            'kicl-z-index-raised',
            {
              'kicl-inset-block-end-0': side === 'bottom',
              'kicl-inset-block-start-0': side === 'top',
              'kicl-inset-inline-end-narrow': align === 'end',
              'kicl-inset-inline-start-narrow': align === 'start',
            },
            className
          )}
          data-align={align}
          data-is={is}
          data-side={side}
          data-slot='bubble-reactions'
        >
          {children}
        </Component>
      </Layout>
    );
  }
);

BubbleReactions.displayName = 'BubbleReactions';

export { BubbleReactions };
