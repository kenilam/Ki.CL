import React from 'react';
import { Route } from 'react-router-dom';
import { asyncReactor } from 'async-reactor';

import API from 'API';
import { randomId } from 'Helper';

import { Project } from 'Component';

import { Connector, resources } from './State';

import './style.scss';

const Loader = () => 'loading';

const ErrorStage = ({ error }) => (
    <React.Fragment>
        <h1>{error.message}</h1>
        <p>{error.stack}</p>
    </React.Fragment>
);

const Works = async () => {
    try {
        const projects = await fetch(API.works).then(data => data.json());
        
        return projects.map(
            (project) => (
                <Project key={randomId} {...project}/>
            )
        );
    } catch (error) {
        return <ErrorStage error={error} />;
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
