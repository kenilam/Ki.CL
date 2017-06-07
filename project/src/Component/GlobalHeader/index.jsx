'use strict';

import React from 'react';

import { Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

class GlobalHeader extends DOM.Component {
    render () {
        return (
            <header data-component-name={resource.name} role='banner'>
                <Navigation list={Sitemap.get()} />
            </header>
        );
    }
}

export default GlobalHeader;