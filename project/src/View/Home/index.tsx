import resources from '$/resources';
import {Logo, Navigation} from '@/Component';
import {Route, withRouter} from '@/Component/Router';
import Background from './Background';
import * as IHome from '@/View/Home/spec';
import React from 'react';
import './Style';

const {view: {home: {path}}} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => (
  <main data-routes='home'>
    <Background/>
    <Logo/>
    <Navigation inline={true} />
  </main>
);

const Component = withRouter(Home);

export default <Route path={path} exact={true} component={Component} />;
