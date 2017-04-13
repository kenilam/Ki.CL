'use strict';

import { EventEmitter } from '@/Component';

class Route {
    constructor (routeName, template) {
        this.routeName = routeName;
        this.template = template;

        return this.render();
    }

    render () {
        return <ReactRouter.Route
            path={`/${this.routeName}`}
            component={this.template}
            onEnter={this.onEnter.bind(this)}
            onLeave={this.onLeave.bind(this)}
        />;
    }

    onEnter () {
        EventEmitter.emit('route.to', this.routeName);
    }

    onLeave () {
        EventEmitter.emit('route.from', this.routeName);
    }
}

export default Route;