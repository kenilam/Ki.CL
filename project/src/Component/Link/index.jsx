// @flow
import React from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import classnames from 'classnames';

import './style.scss';

type Node = React.Node;

type ClassName = {} | Array | String;

type Props = {
    children: Node,
    className: ClassName,
    component: string,
    onClick: Function,
    to: string
};

const activeClassName = 'isActive';

const Link = ({
    children,
    className,
    component: Wrapper,
    onClick,
    to
}: Props) => {
    className = classnames(className);

    const Element = ({ className }) => (
        <NavLink
            exact
            activeClassName={activeClassName}
            className={className}
            onClick={onClick}
            to={to}
        >
            {children}
        </NavLink>
    );

    return (
        <Router>
            {Wrapper ? (
                <Wrapper className={className}>
                    <Element />
                </Wrapper>
            ) : (
                <Element className={className} />
            )}
        </Router>
    );
};

export default Link;
