import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import State from 'State';
import View from 'View';

import { GlobalHeader } from 'Component';

import './App.scss';

const appRoot = document.querySelector('[app-root]');

const Component = () => [
    <GlobalHeader key="GlobalHeader" />,
    <View key="View" />
];

const App = () => (
    <State>
        <Component />
    </State>
);

const hotReload = hot(module);

hotReload(Component);

ReactDOM.render(<App />, appRoot);
