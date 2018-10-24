// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import { Logo } from 'Component';

import { routes } from 'content/resources';

import Background from './Background';
import Navigation from './Navigation';
import Profession from './Profession';

import './style.scss';

const Home = ({ history }) => (
    <React.Fragment>
        <Logo />
        <Profession />
        <Navigation />
        <Background {...{ history }} />
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
