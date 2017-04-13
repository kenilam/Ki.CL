'use strict';

import {
    Route,
    State
} from '@/Helper';

import {
    EventEmitter
} from '@/Component';

class PageNotFound extends Route {
    constructor () {
        super('*', () => new Content());
    }
}

class Content extends React.Component {
    constructor () {
        super();

        this.state = {
            siteName : '',
            resource : {
                message : ''
            }
        };
    }

    siteNameData (siteName) {
        State.update(this, { siteName : siteName });
    }

    resourceData (resource) {
        resource.message = resource.message.replace(/{route}/g, this.props.location.pathname);

        State.update(this, { resource : resource });
    }

    componentWillMount () {
        EventEmitter.on('data.resource.siteName', this.siteNameData.bind(this));
        EventEmitter.on('data.resource.view.pageNotFound', this.resourceData.bind(this));
    }

    componentWillUnmount () {
        EventEmitter.removeListener('data.resource.siteName', this.siteNameData);
        EventEmitter.removeListener('data.resource.view.pageNotFound', this.resourceData);
    }

    render () {
        return {template};
    }
}

export default new PageNotFound();