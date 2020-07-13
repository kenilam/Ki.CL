import resources from '$/resources';
import { Logo, Navigation } from '@/Component'
import { types } from '@/Component/CSSTransition/Type';
import { Route } from '@/Component/Router';
import { Slogan } from '@/View/Home/Component';
import React from 'react';
import './Style';

const {
  view: {
    home: { path },
  },
} = resources;

const hero = '/asset/image/big.sur.png';

const transitionType = types.ZoomOut;

const Home = (
  <main data-routes='home'>
    <Logo isSquare={true} />
    <Navigation />
    <Slogan />
    <section>
      <img src={hero} alt='show' />
    </section>
  </main>
);

export { path, transitionType };
export default (
  <Route path={path} exact={true}>
    {Home}
  </Route>
);
