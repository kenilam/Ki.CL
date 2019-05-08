import data from '$resources/data.json';
import IResources from '$resources/spec';
import { Route, withRouter } from '@Component/Router';
import * as IHome from '@View/Home/spec';
import * as React from 'react';
import { Background } from './Component';
import './Style';

const { view: { home: { path } } } = (data as IResources);

const Home: React.FC<IHome.Props> = () => (
  <main data-routes='home'>
    <Background />
  </main>
);

const Instance = withRouter(Home);

const Component: React.FC<IHome.Component> = () => <Instance />;

export default <Route path={path} exact={true} render={Component} />;
