import React from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import classnames from 'classnames';

import './style.scss';

const activeClassName = 'isActive';

const Link = ({ className, component, to, text }) => {
    let Wrapper;

    const classNames = classnames(className);

    if (component) {
        Wrapper = component;
    }

    return (
        <Router>
            {component ? (
                <Wrapper className={classNames}>
                    <NavLink to={to} exact activeClassName={activeClassName}>
                        {text}
                    </NavLink>
                </Wrapper>
            ) : (
                <NavLink
                    to={to}
                    exact
                    className={className}
                    activeClassName={activeClassName}
                >
                    {text}
                </NavLink>
            )}
        </Router>
    );
};

export default Link;
