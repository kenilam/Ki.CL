import React from 'react';

import State from 'State';
import View from 'View';

import { GlobalHeader } from 'Component';

import './style.scss';

const Component = () => (
    <React.Fragment>
        <GlobalHeader />
        <View />
    </React.Fragment>
);

const App = () => (
    <State>
        <Component />
    </State>
);

export { App };
