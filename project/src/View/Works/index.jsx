'use strict';

import React from 'react';

import { Sitemap } from '~/Component';

Sitemap.set({
    name : 'Works',
    route : '/works'
}, 'works');

const Work = () => (
    <main role='main'>
        <h2>Works!!!</h2>
    </main>
);

export default Work;