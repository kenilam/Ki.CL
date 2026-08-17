import React from 'react';
import classNames from 'classnames';

import type { CardDescriptionIs, CardDescriptionProps } from './Spec';

const CLASS_NAME = 'kicl--components--card__description';

const CardDescription = React.forwardRef<HTMLElement, CardDescriptionProps>(
  ({ children, className, is = 'p', ...rest }, ref) => {
    const Component = is as CardDescriptionIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          CLASS_NAME,
          'kicl-font-size-small',
          'kicl-color-grey-light',
          className
        )}
        data-is={is}
        data-slot='card-description'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export default CardDescription;
