'use strict';

import {
    Route,
    RouteComponent
} from '@/Helper';

import { EventEmitter } from '@/Component';

const routeName = 'works';

class Content extends RouteComponent {
    constructor () {
        super(routeName, Content.template());
    }

    static template () {
        return {template};
    }

    resourceData (resource) {
        super.resourceData(resource);

        EventEmitter.emit('root.logo.resource', resource.logo);
    }
}

class Works extends Route {
    constructor () {
        super(routeName, () => new Content());
    }
}

export default new Works();