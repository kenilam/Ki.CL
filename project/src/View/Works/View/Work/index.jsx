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
  <h2>{ data.id || match.params.projectId }</h2>
);

const Instance = ({ history, location, match, ...rest }) => {
  const { params, url } = match;
  const { projectId } = params;

  return (
    <section data-routes={ `works.${projectId}` } { ...rest }>
      <Asynchronizer { ...{
        awaitExpect: cache[url],
        awaitFor: api,
        awaitProps: params,
        awaitMessage: interpolate(content.loader.text, params),
      } }>
        <Work { ...{ match } }/>
      </Asynchronizer>
    </section>
  );
}

const Component = Route({ exact: true, path, render: Instance });

Work.defaultProps = {
  data: {}
}

export default Component;
