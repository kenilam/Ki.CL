import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { ListItem } from '@/Components';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const Menu: React.FunctionComponent<
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
> = ({
  children,
  className: origin = '',
  dense = false,
  orientation = 'horizontal',
  ...rest
}) => {
  const className = classNames(
    'kicl--components--menu',
    {
      'kicl--components--menu--dense': dense,
      [`kicl--components--menu--orientation--${orientation}`]: orientation,
    },
    origin
  );

  return (
    <menu {...rest} className={className}>
      {React.Children.toArray(children).map((child) => {
        let key = String(child);

        if (React.isValidElement(child)) {
          key = String(child.key);
        }

        return <ListItem key={key}>{child}</ListItem>;
      })}
    </menu>
  );
};

export default Menu;
