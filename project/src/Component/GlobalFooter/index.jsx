'use strict';

import React from 'react';

import classnames from 'classnames';

import { HashRouter as Router } from 'react-router-dom';

import { Logo, Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

class GlobalFooter extends DOM.Component {
    constructor (props) {
        super(props);

        this.state = {};

        this.routeHandler = this.routeHandler.bind(this);
    }

    setInactiveState () {
        cancelAnimationFrame(this.setActiveStateFrame);
        this.setActiveStateFrame = requestAnimationFrame(
            () => this.setState({
                isInactive : resource.inactiveInTheseViews.some(view => view === this.current.name)
            })
        );
    }

    routeHandler (location) {
        const pathname = (location.pathname === '/' ? '/home' : location.pathname).split('/').join('.');

        this.current = Sitemap.get(pathname.substr(1));

        this.setInactiveState();
    }

    render () {
        const className = classnames({
            [`${resource.name}`] : true,
            isInactive : this.state.isInactive,
            isScrolled : this.state.isScrolled,
            isScrolling : this.state.isScrolling,
            isScrolledAway : this.state.isScrolledAway
        });
        
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
                <footer
                    aria-hidden={this.state.isInactive}
                    className={className} role='banner'
                    ref={element => this.element = element}
                    style={this.state.style}
                >
                    <Logo/>
                    <Navigation list={Sitemap.filter(Sitemap.get(), { without : 'home'})} />
                </footer>
            </Router>
        );
    }
}

export default GlobalFooter;