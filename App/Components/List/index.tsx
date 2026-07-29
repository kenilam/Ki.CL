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
>(({ is = 'ul', ...props }, ref) => {
  const hostProps = props as React.HTMLAttributes<HTMLElement>;

  switch (is) {
    case 'ol':
      return (
        <OL
          {...hostProps}
          data-is={is}
          ref={ref as React.ForwardedRef<HTMLOListElement>}
        />
      );
    case 'ul':
      return (
        <UL
          {...hostProps}
          data-is={is}
          ref={ref as React.ForwardedRef<HTMLUListElement>}
        />
      );
    default: {
      const _exhaustive: never = is;
      throw new Error(`Unsupported node type: ${_exhaustive}`);
    }
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
        {/*
          `is` arrives as the whole union, so TypeScript cannot pick the
          matching branch of the polymorphic props through a spread. The value
          is correct by construction; only the narrowing is lost.
        */}
        <Switch
          {...({
            ...rest,
            className,
            is,
          } as React.ComponentProps<typeof Switch>)}
          ref={ref}
        >
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
