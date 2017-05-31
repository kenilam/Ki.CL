'use strict';

import React from 'react';

import { Sitemap } from '~/Component';

Sitemap.set({
    name : 'Home',
    route : '/'
}, 'home');

const Home = () => (
    <main role='main'>
        <h2>Home!!!!</h2>
    </main>
);

export default Home;