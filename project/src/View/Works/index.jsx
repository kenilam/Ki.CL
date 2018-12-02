import React from 'react';
import { Route } from 'react-router-dom';

import API from 'API';
import { randomId } from 'Helper';

import { Preloader } from 'Component';

import { Connector, resources } from './State';

import { Work } from './Component';

import './style.scss';

let projects;

const fetchProjects = async () => {
  projects = await projects || fetch(API.works).then(data => data.json());

  return projects;
};

const Works = ({ data }) => {
  return (
    <nav rule='navigation'>
      <ul>
        { data.map( project => <Work { ...{ ...project, key: randomId } } /> ) }
      </ul>
    </nav>
  );
};

const Instance = Connector(Preloader({ Component: Works, awaitFor: fetchProjects }));

const Component = props => (
  <Route
    path={resources.path}
    component={match => <Instance { ...{ match, ...props } } />}
  />
);

export default Component;
