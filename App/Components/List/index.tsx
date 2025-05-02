import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/Components';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--list';

const OL = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ children, ...props }, ref) => {
  return (
    <ol {...props} ref={ref}>
      {children}
    </ol>
  );
});

OL.displayName = 'List.OL';

const UL = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, ...props }, ref) => {
  return (
    <ul {...props} ref={ref}>
      {children}
    </ul>
  );
});

UL.displayName = 'List.UL';

const Switch = React.forwardRef<
  HTMLOListElement | HTMLUListElement,
  Spec.Switch
>(({ is, ...props }, ref) => {
  switch (is) {
    case 'ol':
      return (
        <OL
          {...props}
          data-is={is}
          ref={ref as React.ForwardedRef<HTMLOListElement>}
        />
      );
    case 'ul':
      return (
        <UL
          {...props}
          data-is={is}
          ref={ref as React.ForwardedRef<HTMLUListElement>}
        />
      );
    default:
      throw new Error(`Unsupported node type: ${is}`);
  }
});

Switch.displayName = 'List.Switch';

const List = React.forwardRef<HTMLOListElement | HTMLUListElement, Spec.Props>(
  (
    {
      children,

      alignContent,
      alignItems,
      autoFlow,
      frames,
      fullScreen,
      gap = 'normal',
      is = 'ul',
      justifyContent,
      justifyItems,
      wrap,

      ...rest
    },
    ref
  ) => {
    const className = classNames(CLASS_NAME, rest.className);

    return (
      <Layout
        alignContent={alignContent}
        alignItems={alignItems}
        autoFlow={autoFlow}
        frames={frames}
        fullScreen={fullScreen}
        gap={gap}
        justifyContent={justifyContent}
        justifyItems={justifyItems}
        wrap={wrap}
      >
        <Switch {...rest} className={className} is={is} ref={ref}>
          {children}
        </Switch>
      </Layout>
    );
  }
);

List.displayName = 'List';

type ListProps = Spec.Props;
type ListNode = Spec.Node;

export { type ListNode, type ListProps };
export default List;
