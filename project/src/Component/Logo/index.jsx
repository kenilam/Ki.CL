'use strict';

import React from '#/react/react';

import {
    HashRouter as Router,
    Link
} from '#/react-router-dom';

import {
    State,
    EventEmitter
} from '@/Helper';

class Logo extends React.Component {
    constructor () {
        super();

        this.state = {
            siteName : 'Ki.CL',
            name : 'HOME',
            route : '/'
        };

        EventEmitter.on('data.resource', this.resourceData.bind(this));
    }

    updateState (state) {
        State.update(this, state);
    }

    resourceData (resource) {
        State.update(
            this, Object.assign(
                {},
                resource.component.logo,
                { siteName : resource.siteName }
            )
        );
    }

    componentWillMount () {

        EventEmitter.on(`${this.props.name ? `.${this.props.name}` : ''}update.logo.state`, this.updateState.bind(this));
    }

    render () {
        return {template};
    }
}

export default Logo;