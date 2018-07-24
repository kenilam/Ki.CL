import React from 'react';
import ReactDOM from 'react-dom';

const appRoot = document.createDocumentFragment();

const renderer = App => {
    ReactDOM.render(<App />, appRoot);

    document.body.insertBefore(appRoot, document.body.childNodes[0]);
};

export default renderer;
