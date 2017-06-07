'use strict';

import React from 'react';

import { Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

class GlobalFooter extends DOM.Component {
    render () {
        return (
            <footer data-component-name={resource.name} role='contentinfo'>
                <Navigation list={Sitemap.get()} />
            </footer>
        );
    }
}

export default GlobalFooter;