import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, ListItem } from '@/Components';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--menu';

const GAPS: Spec.Props['gap'][] = [
  'extreme',
  'narrow',
  'narrower',
  'narrowest',
  'normal',
  'wide',
  'wider',
  'widest',
];

const DEFAULT_GAP: Spec.Props['gap'] = 'normal';

const Menu = React.forwardRef<
  HTMLMenuElement,
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
>(
  (
    {
      children,
      className: _className = '',

      alignContent,
      alignItems,
      autoFlow = 'column',
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
    if (typeof gap !== 'boolean' && ![...GAPS, undefined].includes(gap)) {
      gap = DEFAULT_GAP;
    }

    const className = classNames(CLASS_NAME, _className);

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
        <menu {...rest} className={className} ref={ref}>
          {React.Children.toArray(children).map((child) => {
            let key = String(child);

            if (React.isValidElement(child)) {
              key = String(child.key);
            }

            return (
              <ListItem className={`${CLASS_NAME}--list-item`} key={key}>
                {child}
              </ListItem>
            );
          })}
        </menu>
      </Layout>
    );
  }
);

Menu.displayName = 'Menu';

type MenuProps = Spec.Props;

export { type MenuProps };
export default Menu;
