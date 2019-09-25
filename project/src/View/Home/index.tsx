import resources from '$/resources';
import {Route} from '@/Component/Router';
import IHome from '@/View/Home/spec';
import React from 'react';
import './Style';
import {Navigation} from '@/Component';

const awaitFor = require('../../../asset/image/big.sur.png');

const {
  view: {
    home: {
      path
    }
  }
} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => (
  <main data-routes='home'>
    <Navigation/>
  </main>
);

export {awaitFor, path};
export default (
  <Route path={path} exact={true}>
    <Home/>
  </Route>
)
