import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { getHyperLinkClassNames, Layout } from '@/components';

// Spec
import * as Spec from './spec';

// Styles
import './styles.scss';
import './styles.level.scss';
import './styles.size.scss';
import './styles.variant.scss';

const CLASS_NAME = 'kicl--components--button';

/*
 * Bare text goes in a span. The icon-button look is chosen in CSS by what
 * elements a button holds, and CSS can't see a text node, so without it a
 * label beside an icon or a spinner reads as an icon button and goes round.
 */
const label = (children: React.ReactNode) =>
  React.Children.map(children, (child) =>
    (typeof child === 'string' && child.trim()) || typeof child === 'number' ? (
      <span>{child}</span>
    ) : (
      child
    )
  );

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
      'kicl-text-transform-uppercase': !unstyled,
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
          type={type}
        >
          {label(children)}
        </button>
      </Layout>
    );
  }
);

Button.displayName = 'Button';

type ButtonProps = Spec.Props;

type GetButtonClassNamesProps = Spec.GetButtonClassNamesProps;

export {
  getButtonClassNames,
  Button,
  type ButtonProps,
  type GetButtonClassNamesProps,
};
