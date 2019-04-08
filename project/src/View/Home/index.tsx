import {GraphicLayer} from '@Component';
import {Route, withRouter} from '@Component/Router';
import * as React from 'react';
import methods from './Methods';
import {IComponent, IProps} from './spec';
import {connector} from './State';
import './Style';

const Home: React.FC<IProps> = ({windowSizes: {height, width}}) => (
  <GraphicLayer height={height} width={width} />
);

const Instance = connector(withRouter(methods(Home)));

const Component: React.FC<IComponent> = () => (
  <main data-routes='home'>
    <Instance />
  </main>
);

export default <Route path='/' exact={true} render={Component} />;
