'use strict';

import React from 'react';

import { IndexRoute, HashRouter as Router, Route, Switch} from 'react-router-dom';

import { Sitemap, TransitionGroup } from '~/Component';

import { DOM } from '~/Helper';

import Home from './Home';
import About from './About';
import Works from './Works';

class View extends DOM.Component {
    constructor (props) {
        super(props);

        this.state = {
            route : {},
            style : {
                main : {},
                section : {}
            }
        };

        this.routeHandler = this.routeHandler.bind(this);
        this.updateMainSizes = this.updateMainSizes.bind(this);
        this.updateSectionHandler = this.updateSectionHandler.bind(this);
    }

    routeHandler (location) {
        const pathname = (location.pathname === '/' ? '/home' : location.pathname).split('/').join('.');
        const current = Sitemap.get(pathname.substr(1));

        clearTimeout(this.routeHandlerTimer);

        this.setState({
            route : current || {}
        });

        if (this.props.routeHandler) {
            this.props.routeHandler(current || {});
        }

        if (current.name === 'home') {
            if (!this.viewDuration) {
                this.viewDuration = DOM.Style.getTransitionDuration(document.querySelector('main > section'), true);
            }

            this.routeHandlerTimer = setTimeout(
                () => this.setState({ style : { main : { height : null } } }),
                this.viewDuration
            );
        }
    }

    updateMainSizes (sizes) {
        this.setState({ style : { main : { height : sizes.height } } });
    }

    updateSectionHandler (style) {
        this.setState({ style : { section : style } });
    }

    componentDidMount () {
        DOM.Component.Events.on('view.style', this.updateSectionHandler);
    }

    componentWillUnmount () {
        DOM.Component.Events.off('view.style', this.updateSectionHandler);
    }

    render () {
        const pathname = location.hash.replace('#', '');

        return (
            <Router
                ref={router => {
                    if (!router || this.routeListener) {
                        return;
                    }

                    this.routeListener = router.history.listen(this.routeHandler);
                    this.routeHandler(router.history.location);
                }}
            >
                <TransitionGroup
                    component='main'
                    role='main'
                    data={{ route : this.state.route }}
                    style={this.state.style.main}
                >
                    <Route
                        location={{ pathname : pathname }}
                        key={pathname}
                        path='/:view'
                        children={({ match }) => {
                            const view = match ? match.params.view : null;

                            switch (view) {
                                case 'about' : return <About
                                    style={this.state.style.section}
                                    resizeHandler={this.updateMainSizes}
                                />;

                                case 'works' : return <Works
                                    style={this.state.style.section}
                                    resizeHandler={this.updateMainSizes}
                                />;

                                default : return <Home/>;
                            }
                        }}
                    />
                </TransitionGroup>
            </Router>
        );
    }
}

debgger

export default View;