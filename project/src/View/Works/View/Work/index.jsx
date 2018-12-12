// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';
import { interpolate } from 'Helper';

import { work as api, cache } from 'API';

import resources from 'content/resources';

import './style';

type Data = {
  id?: Number
};

type Props = {
  data?: Data
};

const { content, path } = resources.view.work;

const Work = ({ data, match }: Props) => (
  <React.Fragment>
    <h2>{ data.id || match.params.projectId }</h2>
  </React.Fragment>
);

const Instance = ({ match }) => (
  <section data-routes={ `works.${match.params.projectId}` }>
    {
      Asynchronizer({
        Component: Work,
        awaitExpect: cache[match.url],
        awaitFor: api,
        awaitMessage: interpolate(content.loader.text, match.params),
        awaitProps: match.params,
        match
      })
    }
  </section>
);

const Component = <Route exact { ...{ path, render: Instance } } />;

Work.defaultProps = {
  data: { id: 12345 }
}

export default Component;
