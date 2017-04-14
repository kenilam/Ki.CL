'use strict';

import React from '#/react/react';

import { Route } from '#/react-router-dom';

class Home extends React.Component {
    render () {
        return <Route exact path='/' component={<div>home</div>} />;
    }
}