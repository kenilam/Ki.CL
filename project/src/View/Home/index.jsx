// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import { Logo } from 'Component';

import { routes } from 'content/resources';

import Background from './Background';
import Description from './Description';
import Navigation from './Navigation';
import Profession from './Profession';

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
