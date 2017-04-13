'use strict';

import {
    Route,
    RouteComponent
} from '@/Helper';

import { EventEmitter } from '@/Component';

const routeName = 'works';

class Works extends Route {
    constructor () {
        super(routeName, () => new Content());
    }
}

class Content extends RouteComponent {
    constructor () {
        super(routeName, Content.template());
    }

    resourceData (resource) {
        super.resourceData(resource);

        EventEmitter.emit('root.logo.resource', resource.logo);
    }

    static template () {
        return {template};
    }
}

export default new Works();