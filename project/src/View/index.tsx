import {Router} from '@/Component';
import {TransitionStyleName} from '@/Component/CSSTransition';
import React from 'react';
import About from './About';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Style from './Style';
import Works from './Works';

const View = (
  <Router
    classNames={Style.view}
    routeIndex={0}
    transitionStyle={TransitionStyleName.fade}
  >
    {About}
    {Home}
    {Works}
    {PageNotFound}
  </Router>
);

export default View;
