import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { NavLink } from '@/Router';

// Components
import { getButtonClassNames, Layout, Text } from '@/Components';

// Hooks
import { useScrollIntoView } from '@/Hooks';
import { useURLStatus } from './Hooks';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--components--hyper-link';

const getHyperLinkClassNames = ({
  className,
  unstyled = false,
}: Spec.GetHyperLinkClassNamesProps = {}) => {
  return classNames(
    CLASS_NAME,
    {
      [`${CLASS_NAME}--unstyled`]: unstyled,
    },
    className
  );
};

const HyperLink = React.forwardRef<HTMLAnchorElement, Spec.Props>(
  (
    {
      after,
      before,
      children,
      className: _className = '',
      disabled,
      end = true,
      level,
      lookLikeButton,
      target: _target,
      onClick: clickHandler,
      style,
      to,
      variant,
      unstyled = false,
      ...rest
    },
    ref
  ) => {
    const { scrollIntoView } = useScrollIntoView();

    const status = useURLStatus(to);

    const onClick: Spec.Props['onClick'] = (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      if (status.isHash) {
        event.preventDefault();

        const isString = typeof to === 'string';

        let node: HTMLElement | null = null;

        if (isString) {
          node = window.document.querySelector<HTMLElement>(to);
        }

        if (!isString && to.hash) {
          node = window.document.querySelector<HTMLElement>(to.hash);
        }

        scrollIntoView(node);
      }

      clickHandler?.(event);
    };

    const className = classNames(
      getHyperLinkClassNames({ className: _className, unstyled }),
      {
        [getButtonClassNames({ ...rest, disabled, level, variant })]:
          lookLikeButton && !unstyled,
        [`${CLASS_NAME}--look-like-button`]: lookLikeButton && !unstyled,
      },
      String(_className)
    );

    let target: Spec.Props['target'] = _target;

    if (status.isExternal) {
      target = '_blank';
    }

    let Content = children;

    if (after || before) {
      Content = (
        <Layout
          autoFlow='column'
          alignContent='center'
          alignItems='center'
          gap='narrow'
        >
          <Text className={`${CLASS_NAME}--wrapper`} is='span'>
            {before}
            <Text className={`${CLASS_NAME}--wrapper--content`} is='span'>
              {Content}
            </Text>
            {after}
          </Text>
        </Layout>
      );
    }

    const Link = (
      <NavLink
        {...rest}
        className={className}
        end={end}
        onClick={onClick}
        ref={ref}
        tabIndex={disabled ? -1 : undefined}
        target={target}
        to={to}
        aria-disabled={disabled}
      >
        {Content}
      </NavLink>
    );

    if (lookLikeButton) {
      return <Layout alignItems='center'>{Link}</Layout>;
    }

    return Link;
  }
);

HyperLink.displayName = 'HyperLink';

type HyperLinkProps = Spec.Props;

type GetHyperLinkClassNamesProps = Spec.GetHyperLinkClassNamesProps;

export {
  type GetHyperLinkClassNamesProps,
  type HyperLinkProps,
  getHyperLinkClassNames,
};
export default HyperLink;
