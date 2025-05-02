import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--components--text';

const Text = React.forwardRef<Spec.TextNode, Spec.Props>(
  ({ children, dense, is = 'p', lookLike, variant, ...rest }, ref) => {
    const className = classNames(
      CLASS_NAME,
      {
        [`kicl-look-like-${lookLike}`]: lookLike,
        [`kicl-look-like-${lookLike}--variant--${variant}`]:
          lookLike && variant,
        [`${CLASS_NAME}--is-dense`]: dense,
      },
      rest.className
    );

    const Component = is;

    return (
      <Component {...rest} className={className} data-is={is} ref={ref}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

type TextProps = Spec.Props;

export { type TextProps };
export default Text;
