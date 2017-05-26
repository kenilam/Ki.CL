'use strict';

import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './Home';

const View = () => (
    <Router>
        <Route exact path="/" component={Home}/>
    </Router>
);

export default View;