'use strict';

import React from 'react';

import { Logo, Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

class GlobalHeader extends DOM.Component {
    render () {
        return (
            <header className={resource.name} role='banner' ref={element => this.element = element}>
                <Logo/>
                <Navigation list={Sitemap.filter(Sitemap.get(), { without : 'home'})} />
            </header>
        );
    }
}

export default GlobalHeader;