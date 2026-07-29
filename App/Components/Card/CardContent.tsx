import React from 'react';
import classNames from 'classnames';

import type { CardContentProps, CardSectionIs } from './Spec';

const CLASS_NAME = 'kicl--components--card__content';

const CardContent = React.forwardRef<HTMLElement, CardContentProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as CardSectionIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(CLASS_NAME, className)}
        data-is={is}
        data-slot='card-content'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

CardContent.displayName = 'CardContent';

export default CardContent;
