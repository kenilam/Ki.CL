import {Router} from '@Component';
import {TransitionStyleName} from '@Component/CSSTransition';
import React from 'react';
import * as IView from './spec';
import Work from './Work';

const View: React.FC<IView.Props> = () => (
  <Router
    classNames='works-view'
    routeIndex={1}
    transitionStyle={TransitionStyleName.fade}
  >
    {Work}
  </Router>
);

export default View;
