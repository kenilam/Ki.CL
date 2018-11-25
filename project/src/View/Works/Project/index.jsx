import React from 'react';
import { Route } from 'react-router-dom';
import { asyncReactor } from 'async-reactor';

import { randomId } from 'Helper';
import API from 'API';

import { Connector, resources } from './State';

import './style.scss';

const Loader = () => 'loading';

const Works = async () => {
    const project = await fetch(API.works).then(data => data.json());
    
    return 'Works';
};

const Instance = Connector(asyncReactor(Works, Loader));

const Component = props => (
    <Route
        path={resources.path}
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Component;
