// @flow
import React from 'react';

import { work as api, cache } from 'API';
import { Asynchronizer } from 'Component';

type Data = {
  id: Number
};

type Props = {
  data: Array<Data>
};

const Work = ({ data }: Props) => (
  <React.Fragment>
    <h2>{ data.id }</h2>
  </React.Fragment>
);

const Instance = ({ match }) => Asynchronizer({
  Component: Work,
  awaitFor: api,
  awaitProps: match.params,
  expect: cache[match.url]
});

const Component = ({ match }) => (
  <section className='view' data-routes={ `work.${match.params.projectId}` }>
    <Instance { ...{ match } } />
  </section>
);

export default Component;
