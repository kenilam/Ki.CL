// @flow
import React from 'react';

import { work as api } from 'API';
import { Asynchronizer } from 'Component';

type Data = {
  id: Number
};

type Props = {
  data: Array<Data>
};

const Work = ({ data }: Props) => (
  <section className='work'>
    <h2>{ data.id }</h2>
  </section>
);

const Component = ({ match }) => Asynchronizer({
  Component: Work,
  awaitFor: api,
  awaitProps: match.params
})();

export default Component;
