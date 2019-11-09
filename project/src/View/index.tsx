import {Router} from '@/Component';
import {useLocation} from '@/Component/Router';
import React, {FunctionComponent} from 'react';
import About, {path as aboutPath, transitionType as aboutTransitionType} from './About';
import Home, {path as homePath, transitionType as homeTransitionType} from './Home';
import PageNotFound from './PageNotFound';
import IView from './spec';
import Works, {path as workPath, transitionType as workTransitionType} from './Works';

const TRANSITION_TYPES: IView.TransitionType = {
  [aboutPath]: aboutTransitionType,
  [homePath]: homeTransitionType,
  [workPath]: workTransitionType
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

export default View;
