import data from '$resources/data.json';
import * as IResources from "$resources/spec";
import {Route} from '@Component/Router';
import React from 'react';
import * as IWorks from './spec';
import './Style';
import View from './View';

const {view: {works: {path}}}: IResources.Data = data;

const Works: React.FC<IWorks.Props> = () => (
  <main data-routes='works'>
    <h1>Works</h1>
    <View />
  </main>
);

export default <Route path={path} render={Works} />;
