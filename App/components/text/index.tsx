import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './spec';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--components--text';

const Text = React.forwardRef<Spec.TextNode, Spec.Props>(
  (
    { accent, children, dense, is = 'p', lookLike, unstyled, variant, ...rest },
    ref
  ) => {
    const className = classNames(
      {
        [CLASS_NAME]: !unstyled,
        [`kicl-look-like-${lookLike}`]: !unstyled && lookLike,
        [`${CLASS_NAME}--variant--${variant}`]:
          !unstyled && !lookLike && variant,
        [`${CLASS_NAME}--accent--${accent}`]: !unstyled && accent,
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

export type { Props as TextProps, TextAccent, TextIs, TextNode } from './spec';
export { Text };
