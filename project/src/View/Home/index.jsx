// @flow
import React from 'react';

import { Logo, Navigation } from 'Component';
import { Route } from 'Component/Router';

import resources from 'content/resources';

import './style.scss';

const { view } = resources;
const { path, content } = view.home;

const Home = () => (
  <main data-routes='home'>
    <Logo/>
    <h2>{ content.heading }</h2>
    <p>{ content.description }</p>
    <Navigation/>
  </main>
);

Home.defaultProps = { content };

export default (
  <Route exact path={ path } render={ Home } />
);
