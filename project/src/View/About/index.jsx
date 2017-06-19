'use strict';

import React from 'react';

import { Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

Sitemap.set(resource.sitemap.name, resource.sitemap);

class About extends DOM.Component {
    render () {
        return (
            <section
                data-route={resource.sitemap.route}
                data-view={resource.sitemap.name}
                ref={element => this.element = element}
                style={this.props.style}
            >
                <h2>About!!!!</h2>
            </section>
        );
    }
}

export default About;