import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

import './style.scss';

const About = () => 'about';

const Instance = Connector(About);

const Component = props => (
  <Route
    path={resources.path}
    exact
    component={match => <Instance {...{ match, ...props }} />}
  />
);

export default Component;
