// @flow
import React from 'react';

import { Route, path as pathUtil } from 'Component/Router';

import resources from 'content/resources';

const { notationise } = pathUtil;
const { path } = resources.view.home;

const routes = notationise({ pathname: path });

const Home = (props) => {
  const { data, history, location, match, ...rest } = props;

  return (
    <main data-routes={ routes } { ...rest }>
      <h1>{ match.url }</h1>
    </main>
  );
}

const Component = Route({ exact: true, path, render: Home });

export default Component;
