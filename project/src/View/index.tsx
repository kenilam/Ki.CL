import * as React from 'react';

import {Router} from '@Component';

import Home from './Home';
import Works from './Works';

import {IProps} from './spec';

const View: React.FunctionComponent<IProps> = () => (
  <Router ccomponent={true} main={true} classNames='view'>
    {Home}
    {Works}
  </Router>
);

export default View;
