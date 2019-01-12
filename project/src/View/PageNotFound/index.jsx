// @flow
import React from 'react';

import { Route, path as pathUtil } from 'Component/Router';
import { interpolate } from 'Helper';

import resources from 'content/resources';

const { notationise } = pathUtil;
const { path, content } = resources.view.PageNotFound;
const { message } = content;

const routes = notationise({ pathname: path });

const Home = ({ location }) => (
  <main data-routes={ routes }>
    <h1>{ interpolate(message, location) }</h1>
  </main>
);

const Component = Route({ exact: true, render: Home });

export { path };
export default Component;
