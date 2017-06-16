'use strict';

import React from 'react';

import { Logo, Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

class GlobalFooter extends DOM.Component {
    render () {
        return (
            <footer className={resource.name} role='contentinfo' ref={element => this.element = element}>
                <Logo/>
                <Navigation list={Sitemap.filter(Sitemap.get(), { without : 'home'})} />
            </footer>
        );
    }
}

export default GlobalFooter;