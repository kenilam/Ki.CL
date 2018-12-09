// @flow
import React from 'react';

import { randomId } from 'Helper';

import Item from './Item';

type Props = {
  data?: Array
};

const Navigation = ({ data }: Props) => (
  <nav role='navigation'>
    <ul>
      { data.map( project => <Item { ...{ ...project, key: randomId() } } /> ) }
    </ul>
  </nav>
);

Navigation.defaultProps = {
  data: [
    { id: 123 },
    { id: 234 },
    { id: 345 }
  ]
}

export default Navigation;
