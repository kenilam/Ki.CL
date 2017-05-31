'use strict';

import React from 'react';

import { Navigation, Sitemap } from '~/Component';

import resource from './resource.json';

class GlobalHeader extends React.Component {
    render () {
        return (
            <header data-component-name={resource.name} role='banner'>
                <Navigation list={Sitemap.get()} />
            </header>
        );
    }
}

export default GlobalHeader;