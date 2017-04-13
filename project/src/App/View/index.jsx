'use strict';

import {
    Data,
    EventEmitter,
    Navigation
} from '@/Component';

import {
    CSSTransitionGroup,
    State
} from '@/Helper';

import About from './About';
import PageNotFound from './PageNotFound';
import Root from './Root';
import Works from './Works';

const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const hashHistory = ReactRouter.hashHistory;

class View {
    constructor () {
        hashHistory.listen(View.hashChange);

        return this.render();
    }

    static component ({ children, location: { pathname } }) {
        return new CSSTransitionGroup(
            'section',
            1000,
            children,
            pathname.split('/')[1] || 'index'
        );
    }

    static hashChange () {
        Data.resource();
    }

    render () {
        return {template};
    }
}

export default new View();