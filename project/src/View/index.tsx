import {Router} from '@Component';
import {TransitionStyleName} from '@Component/CSSTransition';
import React from 'react';
import Home from './Home';
import PageNotFound from './PageNotFound';
import * as IView from './spec';
import Style from './Style';
import Works from './Works';

const View: React.FC<IView.Props> = () => (
  <Router
    classNames={Style.view}
    routeIndex={0}
    transitionStyle={TransitionStyleName.fade}
  >
    {Home}
    {Works}
    {PageNotFound}
  </Router>
);

export default View;
