import {Router} from '@Component';
import * as React from 'react';
import Home from './Home';
import PageNotFound from './PageNotFound';
import {IProps} from './spec';
import Works from './Works';

const View: React.FC<IProps> = () => (
  <Router component='main' classNames='view' routeIndex={0} transitionStyle='fade'>
    {Home}
    {Works}
    {PageNotFound}
  </Router>
);

export default View;
