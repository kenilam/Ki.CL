// @flow
import React from 'react';

import { work as api, cache } from 'API';
import { Asynchronizer } from 'Component';

type Data = {
  id?: Number
};

type Props = {
  data?: Data
};

const Work = ({ data, match }: Props) => (
  <React.Fragment>
    <h2>{ data.id || match.params.projectId }</h2>
  </React.Fragment>
);

const Instance = ({ match }) => Asynchronizer({
  Component: Work,
  awaitFor: api,
  awaitProps: match.params,
  awaitExpect: cache[match.url],
  match
});

const Component = ({ match }) => (
  <section className='view' data-routes={ `work.${match.params.projectId}` }>
    <Instance { ...{ match } } />
  </section>
);

Work.defaultProps = {
  data: { id: 12345 }
}

export default Component;
