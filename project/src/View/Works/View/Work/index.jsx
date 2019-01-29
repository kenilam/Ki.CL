// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { interpolate, randomId } from 'Helper';

import { work as api, cache } from 'API';

import resources from 'content/resources';

import './style';

type Data = {
  id?: Number
};

type Props = {
  data?: Data
};

const { content, path } = resources.view.works.view.work;

const Work = ({ data, match }: Props) => (
  <h2>{ data.id || match.params.projectId }</h2>
);

const Instance = ({ data, match }) => {
  const { params, url } = match;

  return (
    <section>
      <Asynchronizer { ...{
        awaitExpect: cache[url],
        awaitFor: api,
        awaitProps: params,
        awaitMessage: interpolate(content.loader.text, params),
      } }>
        <Work data={ data } match={ match }/>
      </Asynchronizer>
    </section>
  );
}

Work.defaultProps = {
  data: {}
}

export default { exact: true, path, render: Instance, key: randomId() };
