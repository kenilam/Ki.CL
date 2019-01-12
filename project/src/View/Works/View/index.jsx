// @flow
import React from 'react';

import Router, { dataAttrs } from 'Component/Router';

import { view } from 'content/resources';

import Work from './Work';

const { path: pathname } = view.works;

const onEnter = () => { dataAttrs('exited', { pathname }); }
const routeIndex = 2;
const transitionStyle = 'fade';

const View = () => (
  <Router { ...{ onEnter, routeIndex, transitionStyle } }>
    { Work }
  </Router>
);

export default View;
