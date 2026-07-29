import React from 'react';
import classNames from 'classnames';

import type { CardActionProps, CardSectionIs } from './Spec';

const CLASS_NAME = 'kicl--components--card__action';

const CardAction = React.forwardRef<HTMLElement, CardActionProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as CardSectionIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(CLASS_NAME, className)}
        data-is={is}
        data-slot='card-action'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

CardAction.displayName = 'CardAction';

export default CardAction;
