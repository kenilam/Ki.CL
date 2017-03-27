'use strict';

import {
    IndexRoute,
    RouteComponent,
    Sitemap,
    State
} from '@/Helper';

import {
    EventEmitter,
    Logo,
    Navigation
} from '@/Component';

const routeName = 'root';

class Root extends IndexRoute {
    constructor () {
        super(() => new Content());
    }
}

class Content extends RouteComponent {
    constructor () {
        super(routeName, Content.template);

        this.state = {
            sitemap : {}
        };
    }

    static sitemapData (sitemap) {
        EventEmitter.emit(`${routeName}.navigation.list`, sitemap);
    }

    static routeTo (event) {
        if (!event.target || !event.target.hash) {
            EventEmitter.emit('route.to', false);
            return;
        }

        EventEmitter.emit('route.to', event.target.hash.substr(2));
    }

    static routeOut () {
        EventEmitter.emit('route.to', false);
    }

    resourceData (resource) {
        super.resourceData(resource);
        EventEmitter.emit(`${routeName}.logo.resource`, resource.logo);
    }

    componentWillMount () {
        super.componentWillMount();
        EventEmitter.on('sitemap.data', Content.sitemapData.bind(this));
    }

    componentWillUnMount () {
        super.componentWillUnMount();
        EventEmitter.removeListener('sitemap.data', Content.sitemapData);
    }

    static template () {
        return {template};
    }
}

export default new Root();