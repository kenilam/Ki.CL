// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import { Logo } from 'Component';

import { routes } from 'content/resources';

import { Background, Description, Navigation, Profession } from './Component';

import './style.scss';

const Home = () => (
  <React.Fragment>
    <Logo />
    <Description />
    <Profession />
    <Navigation />
    <Background />
  </React.Fragment>
);

const Component = props => (
  <Route
    path={routes.home.path}
    exact
    component={match => <Home {...{ match, ...props }} />}
  />
);

export default Component;
