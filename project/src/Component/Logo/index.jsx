'use strict';

import {
    State
} from '@/Helper';

import {
    EventEmitter
} from '@/Component';

class Logo extends React.Component {
    constructor () {
        super();
        this.state = {
            resource : {
                route : '/'
            }
        };
    }

    siteNameData (siteName) {
        State.update(this, { siteName : siteName });
    }

    resourceData (resource) {
        State.update(this, { resource : resource });
    }

    componentWillMount () {
        EventEmitter.on('data.resource.siteName', this.siteNameData.bind(this));
        EventEmitter.on('data.resource.component.logo', this.resourceData.bind(this));
        EventEmitter.on(`${this.props.eventName}${this.props.eventName ? '.' : ''}logo.resource`, this.resourceData.bind(this));
    }

    componentWillUnmount () {
        EventEmitter.removeListener('data.resource.siteName', this.siteNameData);
        EventEmitter.removeListener('data.resource.component.logo', this.resourceData);
        EventEmitter.removeListener(`${this.props.eventName}${this.props.eventName ? '.' : ''}logo.resource`, this.resourceData);
    }

    render () {
        return {template};
    }
}

export default Logo;