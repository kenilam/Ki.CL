'use strict';

import {
    Route,
    RouteComponent
} from '@/Helper';

import { EventEmitter } from '@/Component';

const routeName = 'about';

class About extends Route {
    constructor () {
        super(routeName, () => new Content());
    }
}

class Content extends RouteComponent {
    constructor () {
        super(routeName, Content.template());
    }

    static template () {
        return {template};
    }
}

export default new About();