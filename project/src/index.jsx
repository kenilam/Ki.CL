'use strict';

import {
    State
} from '@/Helper';

import {
    EventEmitter,
    Sitemap
} from '@/Component';

import App from '@/App';

let siteName = '';
let initialMessage = '';
let route = '';

class Index {
    constructor () {
        this.body = document.querySelector('body');

        const setRoute = this.routeAttribute(...[false, this.setTitle.bind(this)]);

        setRoute(location.pathname);

        ReactRouter.hashHistory.listen(value => setRoute(value.pathname));

        EventEmitter.on('route', setRoute);
        EventEmitter.on('route.from', this.routeAttribute(...['from']));
        EventEmitter.on('route.to', this.routeAttribute(...['to']));
        EventEmitter.on('data.resource.siteName', this.siteNameData.bind(this));
        EventEmitter.on('data.resource.initialMessage', this.initialMessageData.bind(this));
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

    siteNameData (data) {
        this.siteName = data;

        this.setTitle();
    }

    initialMessageData (data) {
        this.initialMessage = data;

        this.setTitle();
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
            const hash = Index.getHashValue(value);

            this.route = hash.value;

            this.body[`${hash.method}Attribute`](`data-route${name ? `-${name}` : ''}`, hash.value);

            if (!callback) {
                return;
            }

            callback(value);
        };
    }
}

export default new Index();