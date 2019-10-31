import resources from '$/resources';
import {Navigation} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import IHome from '@/View/Home/spec';
import React from 'react';
import './Style';

const awaitFor = require('../../../asset/image/big.sur.png');
const transitionType: ICSSTransition.Type = 'fade';

const {
  view: {
    home: {
      path
    }
  }
} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => (
  <main data-routes='home'>
    <Navigation />
  </main>
);

export {awaitFor, path, transitionType};
export default (
  <Route path={path} exact={true}>
    <Home />
  </Route>
)
