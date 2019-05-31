import data from '$resources/data.json';
import * as IResources from '$resources/spec';
import {Route} from '@Component/Router';
import React from 'react';
import * as IAbout from './spec';
import './Style';

const {view: {about: {path}}}: IResources.Data = data;

const Works: React.FunctionComponent<IAbout.Props> = () => (
  <main data-routes='about'>
    <h1>About</h1>
  </main>
);

export default <Route path={path} render={Works} />;
