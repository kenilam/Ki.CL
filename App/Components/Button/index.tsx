import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { getHyperLinkClassNames, Layout } from '@/Components';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';
import './Styles.level.scss';
import './Styles.size.scss';
import './Styles.variant.scss';

const CLASS_NAME = 'kicl--components--button';

const getButtonClassNames = ({
  bold,
  className = '',
  disabled,
  level,
  size,
  unstyled,
  variant = 'primary',
}: Spec.GetButtonClassNamesProps = {}) => {
  return classNames(
    CLASS_NAME,
    {
      [`${CLASS_NAME}--bold`]: !unstyled && bold,
      [`${CLASS_NAME}--disabled`]: disabled,
      [`${CLASS_NAME}--size--${size}`]: !unstyled && size,
      [`${CLASS_NAME}--level--${level}`]: !unstyled && level,
      [`${CLASS_NAME}--variant--${variant}`]: !unstyled && variant,
      [`${CLASS_NAME}--unstyled`]: unstyled,
    },
    className
  );
};

const Button = React.forwardRef<HTMLButtonElement, Spec.Props>(
  (
    {
      bold,
      children,
      className: _className = '',
      disabled,
      level,
      lookLikeHyperLink = false,
      onClick: clickHandler,
      size,
      type = 'button',
      unstyled,
      variant = 'primary',

      alignContent = 'center',
      alignItems = 'center',
      autoFlow = 'column',
      gap = 'narrow',
      justifyContent = 'start',
      justifyItems = 'start',

      ...rest
    },
    ref
  ) => {
    const className = classNames({
      [getButtonClassNames({
        bold,
        className: _className,
        disabled,
        size,
        level,
        variant,
        unstyled,
      })]: !lookLikeHyperLink,
      [getHyperLinkClassNames()]: lookLikeHyperLink && !unstyled,
      [`${CLASS_NAME}--look-like-hyperlink`]: lookLikeHyperLink && !unstyled,
    });

    return (
      <Layout
        alignContent={alignContent}
        alignItems={alignItems}
        autoFlow={autoFlow}
        gap={gap}
        justifyContent={justifyContent}
        justifyItems={justifyItems}
      >
        <button
          {...rest}
          className={className}
          disabled={disabled}
          onClick={clickHandler}
          ref={ref}
          tabIndex={disabled ? -1 : undefined}
          type={type}
        >
          {children}
        </button>
      </Layout>
    );
  }
);

Button.displayName = 'Button';

type ButtonProps = Spec.Props;

type GetButtonClassNamesProps = Spec.GetButtonClassNamesProps;

export { type ButtonProps, type GetButtonClassNamesProps, getButtonClassNames };
export default Button;
