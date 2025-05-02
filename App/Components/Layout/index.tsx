import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl-layout';

const Layout = React.forwardRef<HTMLElement, PropsWithChildren<Spec.Props>>(
  (
    {
      children,

      alignContent,
      alignItems,
      autoFlow = 'row',
      display = 'grid',
      frames,
      fullScreen,
      gap = 'normal',
      justifyContent,
      justifyItems,
      wrap,

      ...rest
    },
    ref
  ) => {
    const className = classNames(CLASS_NAME, {
      [`${CLASS_NAME}--align-content--${alignContent}`]: alignContent,
      [`${CLASS_NAME}--align-items--${alignItems}`]: alignItems,
      [`${CLASS_NAME}--${autoFlow}`]: autoFlow,
      [`${CLASS_NAME}--display--${display}`]: display,
      [`${CLASS_NAME}--full-screen`]: fullScreen,
      [`${CLASS_NAME}--gap--${gap}`]: gap,
      [`${CLASS_NAME}--justify-content--${justifyContent}`]: justifyContent,
      [`${CLASS_NAME}--justify-items--${justifyItems}`]: justifyItems,
      [`${CLASS_NAME}--wrap`]: wrap,
      [`${CLASS_NAME}--${frames}`]: frames,
    });

    const Element = React.Children.only(children);

    if (!Element) {
      return Element;
    }

    if (!React.isValidElement(Element)) {
      return Element;
    }

    return React.cloneElement(Element, {
      ...rest,
      ...Element.props,
      className: classNames(className, Element.props.className),
      ref,
    });
  }
);

Layout.displayName = 'Layout';

type LayoutProps = Spec.Props;

export { type LayoutProps };
export default Layout;
