'use strict';

import React from 'react';

import { Logo, Navigation, Sitemap } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

Sitemap.set(resource.sitemap.name, resource.sitemap);

class Home extends DOM.Component {
    render () {
        return (
            <section
                data-route={resource.sitemap.route}
                data-view={resource.sitemap.name}
                ref={element => this.element = element}
            >
                <Logo/>
                <Navigation
                    columnView={true}
                    list={Sitemap.filter(Sitemap.get(), { without : resource.sitemap.name })}
                />
            </section>
        );
    }
}

export default Home;