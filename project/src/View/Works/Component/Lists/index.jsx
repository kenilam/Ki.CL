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
    {data.map(project => (
      <Item project={project} key={randomId()} />
    ))}
  </Navigation>
);

Lists.defaultProps = {
  data: []
};

export default Lists;
