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

const Work = (props: Props) => {
  const { data, history, location, match, ...rest } = props;
  
  return (
    <section data-routes={ `works.${match.params.projectId}` } { ...rest }>
      <Asynchronizer { ...{
        awaitExpect: cache[match.url],
        awaitFor: api,
        awaitProps: match.params,
        awaitMessage: interpolate(content.loader.text, match.params),
      } }>
        <h2>{ data.id || match.params.projectId }</h2>
      </Asynchronizer>
    </section>
  );
}

const Component = Route({ exact: true, path, render: Work });

Work.defaultProps = {
  data: { id: 12345 }
}

export default Component;
