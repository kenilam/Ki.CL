import resources from '$/resources';
import { types } from '@/Component/CSSTransition/Type';
import { Route } from '@/Component/Router';
import API from '@/API/Works';
import React from 'react';
import './Style';
import View from './View';
import { Background, Navigation } from '@/View/Works/Component';

const {
  view: {
    works: { path },
  },
} = resources;

const transitionType = types.ZoomOut;

const Works = (
  <main data-routes='works'>
    <API>
      {
        ({ result }) => (
          <div>
            <h1>Works</h1>
            <View data={result}/>
            <Navigation data={result}/>
          </div>
        )
      }
    </API>
    <Background/>
  </main>
);

export { path, transitionType };
export default <Route path={path}>{Works}</Route>;
