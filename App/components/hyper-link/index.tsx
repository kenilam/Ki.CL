import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { NavLink } from '@/router';

// Components
import { getButtonClassNames, Layout, Text } from '@/components';

// Hooks
import { useURLStatus } from './hooks';

// Spec
import * as Spec from './spec';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--components--hyper-link';

const NEW_TAB = '(opens in a new tab)';

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

/** Drops the router-only props a native anchor would render as attributes. */
const getAnchorProps = ({
  caseSensitive: _caseSensitive,
  discover: _discover,
  preventScrollReset: _preventScrollReset,
  relative: _relative,
  reloadDocument: _reloadDocument,
  replace: _replace,
  state: _state,
  style,
  viewTransition: _viewTransition,
  ...rest
}: Omit<Spec.Props, 'children' | 'to'>) => ({
  ...rest,
  style: typeof style === 'function' ? undefined : style,
});

const HyperLink = React.forwardRef<HTMLAnchorElement, Spec.Props>(
  (
    {
      after,
      before,
      bold,
      children,
      className: _className = '',
      disabled,
      end = true,
      level,
      lookLikeButton,
      target: _target,
      onClick: clickHandler,
      size,
      to,
      variant,
      unstyled = false,
      ...rest
    },
    ref
  ) => {
    const status = useURLStatus(to);

    const onClick: Spec.Props['onClick'] = (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      clickHandler?.(event);
    };

    const className = classNames(
      getHyperLinkClassNames({ className: _className, unstyled }),
      {
        [getButtonClassNames({ bold, disabled, level, size, variant })]:
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
          <span
            className={classNames(
              `${CLASS_NAME}--wrapper`,
              'kicl-position-relative'
            )}
          >
            {before}
            <Text className={classNames('kicl-line-height-narrower', `${CLASS_NAME}--wrapper--content`)} is='span'>
              {Content}
            </Text>
            {after}
          </span>
        </Layout>
      );
    }

    if (target === '_blank') {
      Content = (
        <>
          {Content}
          <span className='kicl-hidden'> {NEW_TAB}</span>
        </>
      );
    }

    const shared = {
      'aria-disabled': disabled,
      className,
      onClick,
      tabIndex: disabled ? -1 : undefined,
      target,
    };

    /*
     * A same-page hash is a plain anchor, so the browser jumps and moves focus
     * itself; the router would swallow the click. Smooth scrolling and the
     * header offset are CSS (see `styles.scss` and `html { scroll-padding }`).
     */
    const Link =
      status.isHash && typeof to === 'string' ? (
        <a {...getAnchorProps(rest)} {...shared} href={to} ref={ref}>
          {Content as React.ReactNode}
        </a>
      ) : (
        <NavLink {...rest} {...shared} end={end} ref={ref} to={to}>
          {Content}
        </NavLink>
      );

    if (lookLikeButton) {
      return (
        <Layout alignItems='center' gap='narrowest'>
          {Link}
        </Layout>
      );
    }

    return Link;
  }
);

HyperLink.displayName = 'HyperLink';

type HyperLinkProps = Spec.Props;

type GetHyperLinkClassNamesProps = Spec.GetHyperLinkClassNamesProps;

export {
  getHyperLinkClassNames,
  HyperLink,
  type GetHyperLinkClassNamesProps,
  type HyperLinkProps,
};
