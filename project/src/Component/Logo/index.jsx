'use strict';

import React from 'react';

import { DOM } from '~/Helper';

import { Link, Sitemap } from '~/Component';

import resource from './resource.json';

class Logo extends DOM.Component {
    constructor (props) {
        super(props);

        this.route = Sitemap.get().home;
    }

    render () {
        return (
            <h1 className={resource.name}>
                <Link item={this.route}>
                    <span>{this.route.name}</span>
                </Link>
            </h1>
        );
    }
}

export default Logo;