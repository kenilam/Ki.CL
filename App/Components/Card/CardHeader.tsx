import React from 'react';
import classNames from 'classnames';

import type { CardHeaderProps, CardSectionIs } from './Spec';

const CLASS_NAME = 'kicl--components--card__header';

const CardHeader = React.forwardRef<HTMLElement, CardHeaderProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as CardSectionIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(CLASS_NAME, className)}
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

export default CardHeader;
