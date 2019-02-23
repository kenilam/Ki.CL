// @flow
import React from 'react';

import { Link } from 'Component';

import resources from 'content/resources';

type Props = {
  children: React.Node,
  title?: string,
  path?: string,
  name?: string
};

const { home } = resources.view;
const { path, name, name: title } = home;

const Item = ({ children, title, path, name }: Props) => (
  <li>
    {children || (
      <Link to={path} title={title}>
        {name}
      </Link>
    )}
  </li>
);

Item.defaultProps = { path, name, title };

export default Item;
