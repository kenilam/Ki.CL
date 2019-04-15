import { Route, withRouter } from '@Component/Router';
import React from 'react';
import method from './Method';
import { IComponent, IProps } from './spec';
import { connector } from './State';
import './Style';
import { Graphic } from './Component';

const Home: React.FC<IProps> = () => (
  <Graphic />
);

const Instance = connector(withRouter(method(Home)));

const Component: React.FC<IComponent> = () => (
  <main data-routes='home'>
    <Instance />
  </main>
);

export default <Route path='/' exact={true} render={Component} />;
