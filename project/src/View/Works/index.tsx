import {Route} from '@Component/Router';
import React from 'react';
import * as IWorks from './spec';
import './Style';
import View from './View';

const Works: React.FC<IWorks.Props> = () => (
  <main data-routes='works'>
    <h1>Works</h1>
    <View />
  </main>
);

export default <Route path='/works' render={Works} />;
