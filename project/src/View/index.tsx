import * as React from 'react';

import { Router } from '@Component';
import { Route } from '@Component/Router';

import { IProps } from './spec';

interface IHome {}
const Home: React.FunctionComponent<IHome> = () => <section>Home</section>;

interface IWorks {}
const Works: React.FunctionComponent<IWorks> = () => <section>Works</section>;

const View: React.FunctionComponent<IProps> = () => (
  <Router component='main' classNames='view'>
    <Route path='/' exact={true} render={Home} />
    <Route path='/works' render={Works} />
  </Router>
);

export default View;
