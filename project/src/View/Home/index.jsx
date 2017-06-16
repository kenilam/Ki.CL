'use strict';

import React from 'react';

import { Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

Sitemap.set(resource.sitemap.name, resource.sitemap);

class Home extends DOM.Component {
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
                <h2>Home!!!!</h2>
            </section>
        );
    }
}

export default Home;