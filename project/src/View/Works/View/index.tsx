import {Router} from '@Component';
import {TransitionStyleName} from '@Component/CSSTransition';
import React from 'react';
import Work from './Work';

const View = (
  <Router
    classNames='works-view'
    routeIndex={1}
    transitionStyle={TransitionStyleName.fade}
  >
    {Work}
  </Router>
);

export default View;
