import { Route } from '@Component/Router';
import React from 'react';
import { IProps } from './spec';
import './Style';
import View from './View';

const Works = ({ }: IProps) => (
  <main data-routes='works'>
    <h1>Works</h1>
    <View />
  </main>
);

export default <Route path='/works' render={Works} />;
