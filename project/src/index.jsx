'use strict';

import {
    Footer,
    Header,
    View
} from '@/App';

import {
    Async,
    EventEmitter
} from '@/Helper';

import React from '#/react/react';
import ReactDOM from '#/react/react-dom';

class Index {
    constructor () {
        ReactDOM.render(<Footer/>, document.querySelector('[app-footer]'));
        ReactDOM.render(<Header/>, document.querySelector('[app-header]'));
        ReactDOM.render(<View/>, document.querySelector('[app-view]'));

        Async.get('/data/resource.json').then(resource => EventEmitter.emit('data.resource', resource));
    }
}

export default new Index();