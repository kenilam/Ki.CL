'use strict';

import React from 'react';

import { CSSTransitionGroup } from 'react-transition-group';

import { HashRouter as Router, Route } from 'react-router-dom';

import { DOM } from '~/Helper';

import Home from './Home';
import Works from './Works';

class View extends React.Component {
    constructor () {
        super();
    }

    componentDidMount () {
        DOM.Unwrap.parent(this.wrapper.querySelector('span'));
        DOM.Unwrap.parent(this.wrapper);
    }

    render () {
        return (
            <Router>
                <main ref={wrapper => this.wrapper = wrapper}>
                    <CSSTransitionGroup
                        transitionName='view'
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        <Route exact path="/" render={Home}/>
                        <Route path="/works" render={Works}/>
                    </CSSTransitionGroup>
                </main>
            </Router>
        );
    }
}

export default View;