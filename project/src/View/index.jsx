'use strict';

import { Data } from '@/Component';

import { CSSTransitionGroup } from '@/Helper';

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

        return View.router();
    }

    static component ({ children, location: { pathname } }) {
        return (
            new CSSTransitionGroup(
                'main',
                1000,
                children,
                pathname.split('/')[1] || 'index'
            )
        );
    }

    static router () {
        return <Router history={hashHistory} className='firstRun'>
            <Route
                path='/'
                component={View.component}
            >
                {Root}
                {About}
                {Works}
                {PageNotFound}
            </Route>
        </Router>;
    }

    static hashChange () {
        Data.resource();
    }
}

export default new View();