'use strict';

import React from 'react';

import { Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

const routeName = 'home';

Sitemap.set(routeName, resource.sitemap);

class Home extends DOM.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <section
                data-route={routeName}
                ref={element => this.element = element}
            >
                <h2>Home!!!!</h2>
            </section>
        );
    }
}

export default Home;