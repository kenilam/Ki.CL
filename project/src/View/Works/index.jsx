'use strict';

import React from 'react';

import { Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

Sitemap.set(resource.sitemap.name.toLowerCase(), resource.sitemap);

class Work extends DOM.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <section
                data-name={resource.name}
                data-route={resource.route}
                ref={element => this.element = element}
            >
                <h2>Works!!!</h2>
            </section>
        );
    }
}

export default Work;