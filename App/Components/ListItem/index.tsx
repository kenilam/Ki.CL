import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/Components';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

type ListItemProps = Required<PropsWithChildren> & PropsWithRef<Spec.Props>;

const CLASS_NAME = 'kicl--components--list-item';

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      children,

      alignContent,
      alignItems,
      autoFlow,
      frames,
      fullScreen,
      gap,
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
        ref={ref}
      >
        <li {...rest} className={className}>
          {children}
        </li>
      </Layout>
    );
  }
);

ListItem.displayName = 'ListItem';

export { type ListItemProps };
export default ListItem;
