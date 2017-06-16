'use strict';

import React from 'react';

import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { IndexRoute, HashRouter as Router, Route} from 'react-router-dom';

import { Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import Home from './Home';
import About from './About';
import Works from './Works';

class View extends DOM.Component {
    constructor (props) {
        super(props);

        this.state = {
            style : {}
        };

        this.home = <Home updateSizes={this.updateViewSize.bind(this)}/>;
        this.about = <About updateSizes={this.updateViewSize.bind(this)}/>;
        this.works = <Works updateSizes={this.updateViewSize.bind(this)}/>;

        this.updateStyle = this.updateStyle.bind(this);
    }

    updateStyle (style) {
        this.setState(Object.assign(this.state.style, style));
    }

    updateViewSize ({height, width}) {
        this.updateStyle({ minHeight : height, minWidth : width });
    }

    updateRoute ({ current }) {
        if (!this.props.updateRoute) {
            return;
        }

        this.props.updateRoute(current);
    }

    onRouteChange (location) {
        const pathname = location.pathname === '/' ? '/home' : location.pathname;
        const current = Sitemap.get(pathname.substr(1).replace(/\//g, '.'));

        this.setState({ current : current })
            .then(this.updateRoute.bind(this));
    }

    componentDidMount () {
        DOM.Component.Events.on('view.updateStyle', this.updateStyle);
    }

    componentWillUnmount () {
        DOM.Component.Events.off('view.updateStyle', this.updateStyle);
    }

    render () {
        return (
            <Router
                ref={router => {
                    if (!router || this.routeListener) {
                        return;
                    }

                    this.routeListener = router.history.listen(this.onRouteChange.bind(this));
                    this.onRouteChange(router.history.location);
                }}
            >
                <Route render={({ location }) => (
                    <CSSTransitionGroup
                        transitionName='fade'
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        component='main'
                        role='main'
                        style={Object.assign({}, this.state.style)}
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