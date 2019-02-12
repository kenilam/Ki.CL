// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Redirect, Route } from 'Component/Router';
import { interpolate } from 'Helper';

import { work } from 'API';

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

const Instance = ({ match }) => {
  const { params } = match;
  
  return (
    <section data-routes={`works.${params.projectId}`}>
      <Asynchronizer
        awaitFor={ work }
        awaitMessage={ interpolate(content.loader.text, params) }
        awaitProps={ params }
        awaitError={ () => (
          <Redirect to='/works'/>
        ) }
      >
        { ({ data }) => (
          <Work data={ data } match={ match }/>
        ) }
      </Asynchronizer>
    </section>
  );
}

Work.defaultProps = {
  data: {}
}

export default (
  <Route exact path={ path } render={ Instance } />
);
