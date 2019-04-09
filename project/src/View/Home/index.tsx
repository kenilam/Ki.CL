import {Route, withRouter} from '@Component/Router';
import * as React from 'react';
import {Graphic} from './Component';
import method from './Method';
import {IComponent, IProps} from './spec';
import {connector} from './State';
import './Style';

const Home: React.FC<IProps> = () => (
  <React.Fragment>
    <Graphic />
  </React.Fragment>
);

const Instance = connector(withRouter(method(Home)));

const Component: React.FC<IComponent> = () => (
  <main data-routes='home'>
    <Instance />
  </main>
);

export default <Route path='/' exact={true} render={Component} />;
