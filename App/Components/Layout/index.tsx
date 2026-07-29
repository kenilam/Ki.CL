import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl-layout';

type Props = PropsWithChildren<Spec.Props>;

const Layout = React.forwardRef<HTMLElement, Props>(
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
    const className = classNames(
      CLASS_NAME,
      {
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
      },
      rest.className
    );

    const Element = React.Children.only(children);

    if (!Element) {
      return Element;
    }

    if (!React.isValidElement(Element)) {
      return Element;
    }

    const props: Props = Element.props || {};
    const childRef = (props as { ref?: React.Ref<HTMLElement | null> }).ref;

    const mergedRef = (node: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef) {
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    return React.cloneElement(
      Element as React.ReactElement<
        Props & { ref?: React.Ref<HTMLElement | null> }
      >,
      {
        ...rest,
        ...props,
        className: classNames(className, props.className),
        ref: mergedRef,
      }
    );
  }
);

Layout.displayName = 'Layout';

type LayoutProps = Spec.Props;

export { type LayoutProps };
export default Layout;
