'use strict';

import ReactDOM from 'react-dom';

import View from './View';

class App {
    constructor () {
        ReactDOM.render(View(), document.querySelector('[app-root]'));
    }
}

export default new App();