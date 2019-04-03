import {Router} from '@Component';
import * as React from 'react';

import Home from './Home';

import {IProps} from './spec';
import Works from './Works';

const View: React.FunctionComponent<IProps> = () => (
  <Router component='main' classNames='view'>
    {Home}
    {Works}
  </Router>
);

export default View;
