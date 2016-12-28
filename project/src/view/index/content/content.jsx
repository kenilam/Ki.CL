'use strict';

import { ComponentState } from '@/helper/helper';

import {
    Base64Transparent,
    Logo,
    Navigation,
    Throbber
} from '@/component/component';

const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const Link = ReactRouter.Link;

const Content = React.createClass({
    getInitialState () {
        return {
            navigation : [],
            logo : {},
            siteName : ''
        };
    },

    heroLoaded (data) {
        return () => this.updateState({
            navigation : Object.keys(data.navigation)
                .filter(
                    name => !data.navigation[name].indexRoute && !data.navigation[name].disabledRoute
                )
                .map(name => ({
                    route : data.navigation[name].route,
                    name : data.navigation[name].name
                    })
                ),
            logo : data.navigation.index.logo,
            siteName : data.siteName
        }, this.setClass);
    },

    ready (data) {
        const hero = new Image();

        hero.onload = this.heroLoaded({
            siteName : data[0].siteName,
            navigation : data[1]
        });

        hero.src = data[1].index.hero;
    },

    addPromiseListener (eventName) {
        return new Promise(
            (resolve) => window.addEventListener(eventName,
                event => resolve(event.detail)
            )
        );
    },

    componentWillMount () {
        this.updateState = ComponentState.update.bind(this);

        Promise.all([
            this.addPromiseListener('app.resource'),
            this.addPromiseListener('view.index.content.resource')
        ]).then(this.ready);
    },

    componentWillUnmount () {
        window.addEventListener('app.resource', this.resourceData);
        window.removeEventListener('view.index.content.resource', this.resourceData);
    },

    render () {
        return (
            {template}
        );
    }
});

export default Content;