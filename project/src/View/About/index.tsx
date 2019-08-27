import resources from '$/resources';
import {Route} from '@/Component/Router';
import React from 'react';
import IAbout from './spec';
import './Style';

const {view: {about: {path}}} = resources;

const Works: React.FunctionComponent<IAbout.Props> = () => (
  <main data-routes='about'>
    <h1>About</h1>
  </main>
);

export default <Route path={path} render={Works} />;
