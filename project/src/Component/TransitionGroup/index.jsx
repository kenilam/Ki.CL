'use strict';

import React from 'react';

import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { DOM } from '~/Helper';

import resource from './resource.json';

class TransitionGroup extends DOM.Component {
    static getSubstringUntilNth (str, pattern, n) {
        return str.split(pattern, n).join(pattern);
    }

    render () {
        return (
            <CSSTransitionGroup
                className={`${resource.name}`}
                component={this.props.component || 'div'}
                data-route={this.props.data && this.props.data.route ? this.props.data.route.route : null}
                data-view={this.props.data && this.props.data.route ? this.props.data.route.name : null}
                role={this.props.role}
                style={this.props.style}
                transitionName={this.props.transitionName || 'animate'}
                transitionEnterTimeout={this.props.transitionEnterTimeout || 1000}
                transitionLeaveTimeout={this.props.transitionLeaveTimeout || 1000}
            >
                {
                    this.props.location ? React.cloneElement(this.props.children, {
                        key: TransitionGroup.getSubstringUntilNth(this.props.location.pathname, '/', 2)
                    }) : this.props.children
                }
            </CSSTransitionGroup>
        );
    }
}

export default TransitionGroup;