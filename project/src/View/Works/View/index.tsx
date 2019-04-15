import { Router } from '@Component';
import { TransitionStyleName } from '@Component/CSSTransition';
import React from 'react';
import { IProps } from './spec';
import Work from './Work';

const View: React.FC<IProps> = () => (
  <Router
    classNames='works-view'
    routeIndex={1}
    transitionStyle={TransitionStyleName.fade}
  >
    {Work}
  </Router>
);

export default View;
