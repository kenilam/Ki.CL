import React from 'react';
import { Route } from 'react-router-dom';
import { asyncReactor } from 'async-reactor';

import API from 'API';
import { randomId } from 'Helper';

import { Errors, Link, Loader } from 'Component';

import { Connector, resources } from './State';

import './style.scss';

let projects;

const Works = async () => {
  try {
    projects = projects || await fetch(API.works).then(data => data.json());

    return (
      <nav>
        <ul>
          {
            projects.map(
              ({ cover, id, name }) => (
                <li key={randomId}>
                  <Link to={`/works/${id}`} title={name}>
                    <img src={cover} alt={name}/>
                  </Link>
                </li>
              )
            )
          }
        </ul>
      </nav>
    );
  } catch (error) {
    return <Errors { ...{ error } } />;
  }
};

const Instance = Connector(asyncReactor(Works, Loader));

const Component = props => (
  <Route
    path={resources.path}
    component={match => <Instance {...{ match, ...props }} />}
  />
);

export default Component;
