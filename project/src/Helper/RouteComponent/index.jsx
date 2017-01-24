'use strict';

import { State } from '@/Helper';

import { EventEmitter } from '@/Component';

class RouteComponent extends React.Component {
    constructor (routeName, template) {
        super();

        this.state = {
            siteName : '',
            route : routeName
        };

        this.routeName = routeName;
        this.template = typeof template === 'function' ? template.call(this) : template;
    }

    render () {
        return this.template;
    }

    siteNameData (siteName) {
        State.update(this, { siteName : siteName });
    }

    resourceData (resource) {
        State.update(this, { resource : resource });
    }

    componentWillMount () {
        EventEmitter.on(`data.resource.view.${this.routeName}`, this.resourceData.bind(this));
        EventEmitter.on('data.resource.siteName', this.siteNameData.bind(this));

        clearTimeout(this.componentWillMountTimer);
        this.componentWillMountTimer = setTimeout(() => {
            EventEmitter.emit('route.from');
        }, 1000);
    }

    componentWillUnmount () {
        EventEmitter.removeListener(`data.resource.view.${this.routeName}`, this.resourceData);
        EventEmitter.removeListener('data.resource.siteName', this.siteNameData);

        EventEmitter.emit('route.to');
    }
}

export default RouteComponent;