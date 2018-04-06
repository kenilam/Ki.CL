import React from 'react';
import ReactDOM from 'react-dom';

const { NODE_ENV } = process.env;

const render = App => {
    const appRoot = document.querySelector('[app-root]');

    ReactDOM.render(<App />, appRoot);
};

import(`./App.${NODE_ENV}.jsx`).then(render);
