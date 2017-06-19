'use strict';

import React from 'react';

import { Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

Sitemap.set(resource.sitemap.name.toLowerCase(), resource.sitemap);

class Work extends DOM.Component {

    componentWillAppear (callback) {
        callback();
    }

    componentDidAppear () {
        debugger
    }

    render () {
        return (
            <section
                data-route={resource.sitemap.route}
                data-view={resource.sitemap.name}
                ref={element => this.element = element}
                style={this.props.style}
            >
                <h2>Works!!!</h2>
                <p>I am here</p>
            </section>
        );
    }
}

export default Work;