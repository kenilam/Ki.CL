'use strict';

import {
    CSSTransitionGroup,
    State
} from '@/Helper';

import {
    EventEmitter,
    Data,
    Logo,
    Navigation
} from '@/Component';

const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const hashHistory = ReactRouter.hashHistory;

const routeName = '**';

class Header {
    constructor () {
        hashHistory.listen(Header.hashChange);

        EventEmitter.on('sitemap.data', Header.sitemapData);

        return this.render();
    }

    static hashChange () {
        Data.resource();
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

    render () {
        return {template};
    }
}

export default new Header();

