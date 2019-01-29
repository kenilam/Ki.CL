// @flow
import React from 'react';

import { randomId } from 'Helper';
import { Navigation } from 'Component';

import Item from './Item';

type Props = {
  data?: Array
};

const Lists = ({ data }: Props) => (
  <Navigation>
    { data.map( project => ( <Item project={ project } key={ randomId() } /> ) ) }
  </Navigation>
);

Lists.defaultProps = {
  data: [
    { id: 123 },
    { id: 234 },
    { id: 345 }
  ]
}

export default Lists;
