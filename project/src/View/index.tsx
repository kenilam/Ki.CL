import {Router} from '@/Component';
import React from 'react';
import About from './About';
import Home, {awaitFor as homeAwaitFor, path as homePath} from './Home';
import PageNotFound from './PageNotFound';
import IView from './spec';
import Works, {path as worksPath} from './Works';

const awaitFor: IView.AwaitFor = {
  home: homeAwaitFor
};

const paths: IView.Paths = {
  home: homePath,
  works: worksPath
};

const View = (
  <Router routeIndex={0}>
    {About}
    {Home}
    {Works}
    {PageNotFound}
  </Router>
);

export {awaitFor, paths};
export default View;
