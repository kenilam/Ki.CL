import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Spec
import * as Spec from './spec';

// Partials
import { Switch } from './switch';

const CLASS_NAME = 'kicl--components--list';

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

export { List, type ListNode, type ListProps };
