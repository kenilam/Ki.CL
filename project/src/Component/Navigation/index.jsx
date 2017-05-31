'use strict';

import React from 'react';

import { NavLink, HashRouter as Router } from 'react-router-dom';

import resource from './resource.json';

class Navigation extends React.Component {
    render () {
        return (
            <Router>
                <nav data-component-name={resource.name}>
                    {Object.keys(this.props.list).map(
                        (name, index) => {
                            const item = this.props.list[name];

                            return (
                                <NavLink
                                    exact
                                    activeClassName='isCurrent'
                                    key={index}
                                    to={item.route}
                                >{item.name}</NavLink>
                            );
                        }
                    )}
                </nav>
            </Router>
        );
    }
}

export default Navigation;