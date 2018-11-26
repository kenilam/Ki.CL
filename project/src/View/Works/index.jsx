import React from 'react';
import { Route } from 'react-router-dom';
import { asyncReactor } from 'async-reactor';

import API from 'API';
import { randomId } from 'Helper';

import { Errors, Loader } from 'Component';

import { Connector, resources } from './State';

import { Work } from './Component';

import './style.scss';

let projects;

const Works = async () => {
  try {
    projects = projects || await fetch(API.works).then(data => data.json());

    return (
      <nav>
        <ul>
          { projects.map( project => <Work { ...{ ...project, key: randomId } } /> ) }
        </ul>
      </nav>
    );
  } catch (errors) {
    return <Errors { ...{ errors } } />;
  }
};

const Instance = Connector(asyncReactor(Works, Loader));

const Component = props => (
  <Route
    path={resources.path}
    component={match => <Instance { ...{ match, ...props } } />}
  />
);

export default Component;
