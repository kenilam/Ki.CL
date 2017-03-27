'use strict';

import {
    EventEmitter
} from '@/Component';

class Sitemap {
    constructor () {
        this.map = {

        };
    }

    static rename (name) {
        return name.toLowerCase().split('/').filter(str => str).join('_');
    }

    multiIndex (parent, mapping, preventCreation) {
        if (!mapping.length) {
            return parent;
        }

        if (!parent[mapping[0]] && !preventCreation) {
            parent[mapping[0]] = {};
        }

        return this.multiIndex(parent[mapping[0]], mapping.slice(1));
    }

    pathIndex (mapping, preventCreation) {
        return typeof mapping === 'string' ? this.multiIndex(this.map, mapping.split('.'), preventCreation) : this.map;
    }

    add (views, mapping) {
        const root = this.pathIndex(mapping);
        const viewList = Array.isArray(views) ? views : [views];

        viewList.forEach(view => root[Sitemap.rename(view.route)] = view);

        EventEmitter.emit(`sitemap${mapping ? `.${mapping}` : ''}.data`, this.get(mapping));
    }

    get (mapping) {
        return this.pathIndex(mapping, true);
    }
}

export default new Sitemap();