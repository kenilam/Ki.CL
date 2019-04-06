import {Router} from '@Component';
import * as React from 'react';
import {IProps} from './spec';
import Work from './Work';

const View: React.FunctionComponent<IProps> = () => (
  <Router component='section' classNames='works-view' routeIndex={1}>
    {Work}
  </Router>
);

export default View;
