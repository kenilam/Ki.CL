// @flow
import React from 'react';

import { randomId } from 'Helper';

import resources from 'content/resources';

import Item from './Item';

import './style';

type ItemProps = {
  name: string,
  path: string,
  title: string
};

type Props = {
  children: React.Node,
  items?: Array<ItemProps>
};

const { view } = resources;

const basePath = view.home.path;

const defaultProps = {
  items: Object.keys(view)
    .filter(page => !view[page].excluded && view[page].path !== basePath)
    .map(page => {
      const { name } = view[page];

      return { ...view[page], title: name };
    })
};

const Navigation = ({ items, children }: Props) => (
  <nav role="navigation">
    {children || (
      <ul>
        {items.map(({ key = randomId(), name, path, title }) => (
          <Item name={name} path={path} title={title} key={key} />
        ))}
      </ul>
    )}
  </nav>
);

Navigation.defaultProps = defaultProps;

export { defaultProps };
export default Navigation;
