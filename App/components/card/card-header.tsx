import React from 'react';
import classNames from 'classnames';

import type { CardHeaderProps, CardSectionIs } from './spec';

const CLASS_NAME = 'kicl--components--card__header';

const CardHeader = React.forwardRef<HTMLElement, CardHeaderProps>(
  ({ children, className, dense, is = 'header', ...rest }, ref) => {
    const Component = is as CardSectionIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          { 'kicl-padding-block': !dense },
          CLASS_NAME,
          className
        )}
        data-is={is}
        data-slot='card-header'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export { CardHeader };
