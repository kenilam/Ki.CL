import React from 'react';
import ReactDOM from 'react-dom';

const { NODE_ENV } = process.env;

const App = require(`./${NODE_ENV}`);

const appRoot = document.querySelector('[app-root]');

ReactDOM.render(<App />, appRoot);
