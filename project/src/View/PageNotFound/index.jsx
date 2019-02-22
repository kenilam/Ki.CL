// @flow
import React from 'react';

import { Route } from 'Component/Router';
import { interpolate } from 'Helper';

import resources from 'content/resources';

const { path, content } = resources.view.PageNotFound;

const PageNotFound = ({ location }) => (
    <main>
        <h1>{interpolate(content.message, location)}</h1>
    </main>
);

export default <Route exact path={path} render={PageNotFound} />;
