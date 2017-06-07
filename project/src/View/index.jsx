'use strict';

import React from 'react';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import { IndexRoute, HashRouter as Router, Route} from 'react-router-dom';

import { Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import Home from './Home';
import Works from './Works';

class View extends DOM.Component {
    constructor () {
        super();

        this.state = {
            style : {}
        };

        this.home = <Home updateWrapperSize={this.updateViewSize.bind(this)}/>;
        this.works = <Works updateWrapperSize={this.updateViewSize.bind(this)}/>;
    }

    onRouterUpdate (location) {
        const pathname = location.pathname === '/' ? '/home' : location.pathname;

        this.setState({ current : Sitemap.get(pathname.substr(1).replace(/\//g, '.')) });
    }

    updateViewSize ({height, width}) {
        this.setState({style : { minHeight : height, minWidth : width}});
    }

    render () {
        return (
            <Router
                ref={routerRef => {
                    if (!routerRef || this.routeListener) {
                        return;
                    }

                    this.routeListener = routerRef.history.listen(this.onRouterUpdate.bind(this));
                    this.onRouterUpdate(routerRef.history.location);
                }}
            >
                <Route render={({ location }) => (
                    <CSSTransitionGroup
                        transitionName='fade'
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        component='main'
                        role='main'
                        style={this.state.style}
                    >
                        <Route
                            location={location}
                            key={location.pathname}
                            path='/:view'
                            children={({ match }) => {
                                if (!match) {
                                    return this.home;
                                }

                                return this[match.params.view] ? this[match.params.view] : null;
                            }}
                        />
                    </CSSTransitionGroup>
                )}/>
            </Router>
        );
    }
}

export default View;