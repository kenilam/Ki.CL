import React from 'react';

import State from 'State';
import View from 'View';

import { GlobalHeader } from 'Component';

import './style.scss';

const Component = () => [
    <GlobalHeader key="GlobalHeader" />,
    <View key="View" />
];

const App = () => (
    <State>
        <Component />
    </State>
);

export default App;
