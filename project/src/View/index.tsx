import {Router} from '@/Component';
import {useLocation} from '@/Component/Router';
import React, {FunctionComponent} from 'react';
import About, {path as aboutPath, transitionType as aboutTransitionType} from './About';
import Home, {awaitFor as homeAwaitFor} from './Home';
import PageNotFound from './PageNotFound';
import IView from './spec';
import Works from './Works';

const AWAIT_FOR: IView.AwaitFor = {
  homeAwaitFor: homeAwaitFor
};

const TRANSITION_TYPES: IView.TransitionType = {
  [aboutPath]: aboutTransitionType
};

const View: FunctionComponent<IView.Props> = () => {
  const {pathname} = useLocation();
  
  return (
    <Router
      routeIndex={0}
      type={TRANSITION_TYPES[pathname]}
    >
      {About}
      {Home}
      {Works}
      {PageNotFound}
    </Router>
  );
};

export {AWAIT_FOR};
export default View;
