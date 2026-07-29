import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--components--text';

const Text = React.forwardRef<Spec.TextNode, Spec.Props>(
  (
    { children, dense, is = 'p', lookLike, unstyled, variant, ...rest },
    ref
  ) => {
    const className = classNames(
      {
        [CLASS_NAME]: !unstyled,
        [`kicl-look-like-${lookLike}`]: !unstyled && lookLike,
        [`kicl-variant--${variant}`]: !unstyled && !lookLike && variant,
        [`kicl-look-like-${lookLike}--variant--${variant}`]:
          !unstyled && lookLike && variant,
        [`${CLASS_NAME}--is-dense`]: !unstyled && dense,
      },
      rest.className
    );

    const Component = is;

    return (
      <Component
        {...(rest as React.HTMLAttributes<HTMLElement>)}
        className={className}
        data-is={is}
        ref={ref as never}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export type { Props as TextProps, TextIs, TextNode } from './Spec';
export default Text;
