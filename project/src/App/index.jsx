import React from 'react';
import ReactDOM from 'react-dom';

const { NODE_ENV } = process.env;

const App = require(`./${NODE_ENV}`);

const appRoot = document.createDocumentFragment();

ReactDOM.render(<App />, appRoot);

document.body.insertBefore(appRoot, document.body.childNodes[0]);
