import React from 'react';
import classNames from 'classnames';

import { Layout } from '@/components/layout';

import type { CardFooterProps, CardSectionIs } from './spec';

const CLASS_NAME = 'kicl--components--card__footer';

const CardFooter = React.forwardRef<HTMLElement, CardFooterProps>(
  ({ children, className, is = 'footer', ...rest }, ref) => {
    const Component = is as CardSectionIs;

    return (
      <Layout
        alignItems='center'
        autoFlow='column'
        gap='narrowest'
        justifyContent='stretch'
        ref={ref}
      >
        <Component
          {...(rest as React.HTMLAttributes<HTMLElement>)}
          className={classNames(
            'kicl-padding-block',
            'kicl-position-sticky',
            'kicl-inset-block-end-0',
            CLASS_NAME,
            className
          )}
          data-is={is}
          data-slot='card-footer'
        >
          {children}
        </Component>
      </Layout>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { CardFooter };
