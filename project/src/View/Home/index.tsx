import resources from '$/resources';
import { Logo, Navigation } from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import { Route } from '@/Component/Router';
import Slogan from '@/View/Home/Slogan';
import React from 'react';
import './Style';

const {
  view: {
    home: { path },
  },
} = resources;

const api = '/asset/image/big.sur.png';
const transitionType: ICSSTransition.Type = 'fade';

const Home = (
  <main data-routes='home'>
    <Logo isSquare={true} />
    <Navigation />
    <Slogan />
    <section>
      <img src={`../../..${api}`} alt='show' />
    </section>
  </main>
);

export { path, transitionType };
export default (
  <Route path={path} exact={true}>
    {Home}
  </Route>
);
