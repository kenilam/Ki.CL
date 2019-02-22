// @flow
import React from 'react';

import { about, caches } from 'API';

import { Asynchronizer, Logo, Navigation } from 'Component';
import { Route } from 'Component/Router';

import resources from 'content/resources';

import './style';

const {
    view: {
        home: {
            content: { loader, heading },
            path
        }
    }
} = resources;

const Home = () => (
    <main data-routes="home">
        <Asynchronizer
            awaitCache={caches['/about']}
            awaitFor={about}
            awaitMessage={loader.text}
            iconOnly
        >
            {({ data }) => (
                <React.Fragment>
                    <Logo />
                    <h2>{heading}</h2>
                    <p>{data.sections.About}</p>
                    <Navigation />
                </React.Fragment>
            )}
        </Asynchronizer>
    </main>
);

export default <Route exact path={path} render={Home} />;
