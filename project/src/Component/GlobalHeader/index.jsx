'use strict';

import React from 'react';

import classnames from 'classnames';

import { HashRouter as Router } from 'react-router-dom';

import { Logo, Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

class GlobalHeader extends DOM.Component {
    constructor (props) {
        super(props);

        this.state = {};

        this.scroll = {
            limitRate : 3,
            scrollTop : document.body.scrollTop
        };

        this.routeHandler = this.routeHandler.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    getTranslate3d (scrollTop) {
        if (scrollTop <= this.element.offsetHeight * this.scroll.limitRate) {
            return DOM.Style.translate3d(0, 0);
        }

        if (scrollTop > this.element.offsetHeight && scrollTop < this.element.offsetHeight * (this.scroll.limitRate + 1)) {
            return DOM.Style.translate3d(0, -1 * (scrollTop - this.element.offsetHeight * this.scroll.limitRate));
        }

        return DOM.Style.translate3d(0, -1 * this.element.offsetHeight);
    }

    updateState (scrollTop) {
        const isInactive = !Boolean(scrollTop) && scrollTop !== 0;

        if (isInactive) {
            this.state = {
                style : {}
            }
        }

        this.setState({
            style : isInactive ? {} : this.getTranslate3d(scrollTop),
            isInactive : isInactive,
            isScrolled : isInactive ? false : scrollTop > 1,
            isScrolling : isInactive ? false : scrollTop !== this.scroll.scrollTop,
            isScrolledAway : isInactive ? false : this.element.getBoundingClientRect().top === -1 * this.element.offsetHeight
        });
    }

    setScrollState (scrollTop) {
        DOM.Component.cancelAnimationFrame(this.scroll.setScrollStateFrame);
        this.scroll.setScrollStateFrame = DOM.Component.requestAnimationFrame(
            () => {
                const isInactive = resource.inactiveInTheseViews.some(view => view === this.current.name);

                this.updateState(isInactive ? false : scrollTop);

                this.scroll.scrollTop = scrollTop;
            }
        );
    }

    scrollHandler (event) {
        this.setScrollState(event.srcElement.scrollingElement.scrollTop);

        DOM.Component.cancelAnimationFrame(this.scroll.scrollHandlerFrame);
        this.scroll.scrollHandlerFrame = DOM.Component.requestAnimationFrame(
            () => this.setScrollState(event.srcElement.scrollingElement.scrollTop)
        );
    }

    routeHandler (location) {
        const pathname = (location.pathname === '/' ? '/home' : location.pathname).split('/').join('.');

        this.current = Sitemap.get(pathname.substr(1));

        this.setScrollState(document.body.scrollTop);
    }

    componentDidMount () {
        super.componentDidMount();

        this.setScrollState(this.scroll.scrollTop);
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

                <header
                    aria-hidden={this.state.isInactive}
                    className={className} role='banner'
                    ref={element => this.element = element}
                    style={this.state.style}
                >
                    <Logo/>
                    <Navigation list={Sitemap.filter(Sitemap.get(), { without : 'home'})} />
                </header>
            </Router>
        );
    }
}

export default GlobalHeader;