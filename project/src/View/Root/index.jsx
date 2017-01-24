'use strict';

import {
    IndexRoute,
    RouteComponent
} from '@/Helper';

import {
    EventEmitter,
    Logo,
    Navigation
} from '@/Component';

const routeName = 'root';

class Content extends RouteComponent {
    constructor () {
        super(routeName, Content.template);
    }

    static template () {
        return {template};
    }

    routeTo (add) {
        return () => EventEmitter.emit('route.to', add ? this.state.resource.logo.route.substr(1) : false);
    }

    resourceData (resource) {
        super.resourceData(resource);
        EventEmitter.emit(`${this.state.route}.logo.resource`, resource.logo);
    }
}

class Root extends IndexRoute {
    constructor () {
        super(() => new Content());
    }
}

export default new Root();