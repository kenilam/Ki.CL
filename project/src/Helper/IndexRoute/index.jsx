'use strict';

import { EventEmitter } from '@/Component';

class IndexRoute {
    constructor (template) {
        this.routeName = 'root';
        this.template = template;

        return this.render();
    }

    render () {
        return <ReactRouter.IndexRoute
            component={this.template}
            onEnter={this.onEnter.bind(this)}
            onLeave={this.onLeave.bind(this)}
        />;
    }

    componentDidMount () {
        EventEmitter.emit('route.to');
    }

    componentWillUnmount () {
        EventEmitter.emit('route.from');
    }

    onEnter () {
        EventEmitter.emit('route.to', this.routeName);
    }

    onLeave () {
        EventEmitter.emit('route.from', this.routeName);
    }
}

export default IndexRoute;