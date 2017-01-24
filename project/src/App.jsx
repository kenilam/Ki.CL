'use strict';

import {
    EventEmitter
} from '@/Component';

import View from '@/View';

let siteName = '';
let initialMessage = '';
let route = '';

class App {
    constructor () {
        this.appRoot = document.querySelector('[app-root]');

        const setRoute = this.routeAttribute(...[false, this.setTitle.bind(this)]);

        this.render();

        setRoute(location.pathname);

        ReactRouter.hashHistory.listen(value => setRoute(value.pathname));

        EventEmitter.on('route', setRoute);
        EventEmitter.on('route.from', this.routeAttribute(...['from']));
        EventEmitter.on('route.to', this.routeAttribute(...['to']));
        EventEmitter.on('data.resource.siteName', this.siteNameData.bind(this));
        EventEmitter.on('data.resource.initialMessage', this.initialMessageData.bind(this));
        EventEmitter.on('sitemap.data', this.sitemapData.bind(this));
    }

    sitemapData (sitemap) {

    }

    siteNameData (siteName) {
        this.siteName = siteName;

        this.setTitle();
    }

    initialMessageData (initialMessage) {
        this.initialMessage = initialMessage;

        this.setTitle();
    }

    static getHashValue (value) {
        let hash = value && value.hash !== undefined ? value.hash : value;

        if (hash === '/') {
            hash = '/root';
        }

        if (Boolean(hash)) {
            if (hash[0] !== '/') {
                hash = `/${hash}`;
            }
        }

        return {
            method: hash ? 'set' : 'remove',
            value: hash ? hash.split('?')[0].substr(1).replace(/\//g, '.') : 'root'
        };
    }

    setTitle () {
        if (!this.siteName || !this.initialMessage) {
            return;
        }

        if (this.route && this.route !== 'root') {
            document.title = `${this.siteName} | ${this.route.replace(/\./g, ' | ').toUpperCase()}`;

            return;
        }

        document.title = this.initialMessage;
    }

    routeAttribute (name, callback) {
        return value => {
            const hash = App.getHashValue(value);

            this.route = hash.value;

            this.appRoot[`${hash.method}Attribute`](
                `data-route${name ? `-${name}` : ''}`,
                hash.value
            );

            if (!callback) {
                return;
            }

            callback(value);
        };
    }

    render () {
        ReactDOM.render(
            View,
            this.appRoot
        );
    }
}

export default new App();