import {Router} from '@/Component';
import {TransitionStyle} from '@/Component/CSSTransition';
import IRouter from '@/Component/Router/spec';
import React from 'react';
import About, {path as abortPath} from './About';
import Home, {awaitFor as homeAwaitFor, path as homePath} from './Home';
import PageNotFound from './PageNotFound';
import IView from './spec';
import Style from './Style';
import Works, {path as worksPath} from './Works';

const awaitFor: IView.AwaitFor = {
  home: homeAwaitFor
};

const paths: IView.Paths = {
  home: homePath,
  works: worksPath
};

const transitionStyle: IRouter.TransitionStyleFunction = (
  {location}
) => TransitionStyle.name[
  [abortPath, worksPath].some(
    path => location ? path === location.pathname : true
  ) ? 'custom' : 'fade'
  ];

const View = (
  <Router
    classNames={Style.view}
    routeIndex={0}
    transitionStyle={transitionStyle}
  >
    {About}
    {Home}
    {Works}
    {PageNotFound}
  </Router>
);

export {awaitFor, paths};
export default View;
