import React from 'react';
import classNames from 'classnames';

import { Layout } from '@/components/layout';

import type { BubbleGroupIs, BubbleGroupProps } from './spec';

const CLASS_NAME = 'kicl--components--bubble__group';

const BubbleGroup = React.forwardRef<HTMLElement, BubbleGroupProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as BubbleGroupIs;

    return (
      <Layout gap='narrow' ref={ref}>
        <Component
          {...(rest as React.HTMLAttributes<HTMLElement>)}
          className={classNames(CLASS_NAME, className)}
          data-is={is}
          data-slot='bubble-group'
        >
          {children}
        </Component>
      </Layout>
    );
  }
);

BubbleGroup.displayName = 'BubbleGroup';

export { BubbleGroup };
