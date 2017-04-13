'use strict';

import {
    State
} from '@/Helper';

import {
    EventEmitter
} from '@/Component';

class Navigation extends React.Component {
    constructor () {
        super();

        this.state = {
            siteName : '',
            list : {}
        };
    }

    siteNameData (siteName) {
        State.update(this, { siteName : siteName });
    }

    resourceData (resource) {
        State.update(this, { resource : resource });
    }

    listData (list) {
        State.update(this, { list : list });
    }

    componentWillMount () {
        EventEmitter.on('data.resource.siteName', this.siteNameData.bind(this));
        EventEmitter.on('data.resource.component.navigation', this.resourceData.bind(this));
        EventEmitter.on(`${this.props.eventName}${this.props.eventName ? '.' : ''}navigation.list`, this.listData.bind(this));
    }

    componentWillUnmount () {
        EventEmitter.removeListener('data.resource.siteName', this.siteNameData);
        EventEmitter.removeListener('data.resource.component.navigation', this.resourceData);
        EventEmitter.removeListener(`${this.props.eventName}${this.props.eventName ? '.' : ''}navigation.list`, this.listData);
    }

    render () {
        return {template};
    }
}

export default Navigation;