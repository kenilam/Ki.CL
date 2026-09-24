import React from 'react';
import classNames from 'classnames';

import type { CardFooterProps, CardSectionIs } from './spec';

const CLASS_NAME = 'kicl--components--card__footer';

const CardFooter = React.forwardRef<HTMLElement, CardFooterProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as CardSectionIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          'kicl-padding-block-start',
          CLASS_NAME,
          className
        )}
        data-is={is}
        data-slot='card-footer'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { CardFooter };
