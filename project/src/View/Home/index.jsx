// @flow
import React from 'react';

import { Route } from 'Component/Router';

import resources from 'content/resources';

const { path } = resources.view.home;

const Home = (props) => {
  const { data, history, location, match, ...rest } = props;

  return (
    <main data-routes='home' { ...rest }>
      <h1>{ match.url }</h1>
    </main>
  );
}

const Component = Route({ exact: true, path, render: Home });

export default Component;
