'use strict';

import React from 'react';

import classnames from 'classnames';

import { Link } from '~/Component';

import { DOM } from '~/Helper';

import resource from './resource.json';

class Navigation extends DOM.Component {
    render () {
        return (
            <nav className={classnames({
                [resource.name] : true,
                isColumnView : this.props.columnView
            })}>
                {Object.keys(this.props.list).map(
                    (name, index) => (
                        <Link key={index} item={this.props.list[name]}/>
                    )
                )}
            </nav>
        );
    }
}

export default Navigation;