// @flow

import React from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import classnames from 'classnames';

import './style.scss';

type Props = {
    children: React.Node,
    className: string,
    component: string,
    to: string,
    text: string
};

const activeClassName = 'isActive';

const Link = ({ children, className, component, to, text }: Props) => {
    let Wrapper;

    className = classnames(className);

    const Element = () => (
        <NavLink
            exact
            {...{
                activeClassName,
                to,
                className: !component ? className : null
            }}
        >
            {text || children}
        </NavLink>
    );

    if (component) {
        Wrapper = component;
    }

    return (
        <Router>
            {component ? (
                <Wrapper {...{ className }}>
                    <Element />
                </Wrapper>
            ) : (
                <Element />
            )}
        </Router>
    );
};

export default Link;
