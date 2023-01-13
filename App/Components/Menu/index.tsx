import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { ListItem } from '@/Components';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--components--menu';

const Menu = React.forwardRef<
  HTMLMenuElement,
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
>(
  (
    {
      children,
      className: origin = '',
      dense = false,
      orientation = 'horizontal',
      ...rest
    },
    ref
  ) => {
    const className = classNames(
      CLASS_NAME,
      {
        [`${CLASS_NAME}--dense`]: dense,
        [`${CLASS_NAME}--orientation--${orientation}`]: orientation,
      },
      origin
    );

    return (
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
    );
  }
);

Menu.displayName = 'Menu';

type MenuProps = Spec.Props;

export { type MenuProps };
export default Menu;
