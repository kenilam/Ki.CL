import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const ListItem: React.FunctionComponent<
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
> = ({ children, className: origin = '', ...rest }) => {
  const className = classNames('kicl--components--list-item', origin);

  return (
    <li {...rest} className={className}>
      {children}
    </li>
  );
};

export default ListItem;
