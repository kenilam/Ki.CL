import resources from '$/resources';
import { types } from '@/Components/CSSTransition/Type';
import { Route } from '@/Components/Router';
import React from 'react';
import './Style';
import View from './View';

const {
  view: {
    works: { path },
  },
} = resources;

const transitionType = types.SlideUp;

const Works = (
  <main data-routes='works'>
    <h1>Works</h1>
    {View}
  </main>
);

export { path, transitionType };
export default <Route path={path}>{Works}</Route>;
