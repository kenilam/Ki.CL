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

    if (component) {
        Wrapper = component;
    }

    return (
        <Router>
            {component ? (
                <Wrapper {...{ className }}>
                    <NavLink exact {...{ activeClassName, to }}>
                        {text}
                    </NavLink>
                </Wrapper>
            ) : (
                <NavLink exact {...{ activeClassName, className, to }}>
                    {text || children}
                </NavLink>
            )}
        </Router>
    );
};

export default Link;
