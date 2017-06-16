'use strict';

import React from 'react';

import { NavLink, HashRouter as Router } from 'react-router-dom';

import { DOM } from '~/Helper';

import appResource from '~/resource.json';

class Link extends DOM.Component {
    render () {
        return (
            <Router>
                <NavLink
                    exact
                    className={this.props.className}
                    activeClassName='isCurrent'
                    to={this.props.item.route}
                    title={`${appResource.name} | ${this.props.item.name.toUpperCase()}`}
                >{this.props.children || this.props.item.name}</NavLink>
            </Router>
        );
    }
}

export default Link;