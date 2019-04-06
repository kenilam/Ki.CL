import {Router} from '@Component';
import GlobalHeader from "@Component/GlebalHeader";
import * as React from 'react';
import Home from './Home';
import PageNotFound from './PageNotFound';
import {IProps} from './spec';
import Works from './Works';

const View: React.FunctionComponent<IProps> = () => (
  <React.Fragment>
    <GlobalHeader/>
  <Router component='main' classNames='view' routeIndex={0}>
    {Home}
    {Works}
    {PageNotFound}
  </Router>
  </React.Fragment>
);

export default View;
