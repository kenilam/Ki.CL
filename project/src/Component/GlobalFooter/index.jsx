'use strict';

import React from 'react';

import { Navigation, Sitemap } from '~/Component';

import resource from './resource.json';

class GlobalFooter extends React.Component {
    render () {
        return (
            <footer data-component-name={resource.name} role='contentinfo'>
                <Navigation list={Sitemap.get()} />
            </footer>
        );
    }
}

export default GlobalFooter;