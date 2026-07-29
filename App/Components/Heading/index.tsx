import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--components--heading';

const Heading = React.forwardRef<HTMLHeadingElement, Spec.Props>(
  ({ children, className: origin = '', dense, is = 'h1', ...rest }, ref) => {
    const className = classNames(
      CLASS_NAME,
      {
        [`${CLASS_NAME}--is-dense`]: dense,
      },
      origin
    );

    const Component = is;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}
        className={className}
        data-is={is}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

type HeadingProps = Spec.Props;

export { type HeadingProps };
export default Heading;
