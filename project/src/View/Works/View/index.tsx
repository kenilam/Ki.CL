import {Router} from '@Component';
import * as React from 'react';
import {IProps} from './spec';
import Work from './Work';

const View: React.FC<IProps> = () => (
  <Router component={React.Fragment} classNames='works-view' routeIndex={1} transitionStyle='fade'>
    {Work}
  </Router>
);

export default View;
