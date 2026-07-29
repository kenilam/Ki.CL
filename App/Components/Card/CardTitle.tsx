import React from 'react';
import classNames from 'classnames';

import type { CardTitleIs, CardTitleProps } from './Spec';

const CLASS_NAME = 'kicl--components--card__title';

const CardTitle = React.forwardRef<HTMLElement, CardTitleProps>(
  ({ children, className, is = 'div', ...rest }, ref) => {
    const Component = is as CardTitleIs;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={classNames(
          CLASS_NAME,
          'kicl-font-weight-bold',
          'kicl-line-height-narrow',
          className
        )}
        data-is={is}
        data-slot='card-title'
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export default CardTitle;
