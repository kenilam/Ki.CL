// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import CSSTransition from './CSSTransition';

import './style.scss';

type className = String;

type components = {
    element: String,
    wrapper: String
};

type Props = {
    className: Array<className>,
    childComponent: React.Node,
    components: components
};

const Transition = ({
    className,
    childComponent,
    components,
    ...rest
}: Props) => {
    const { wrapper, element } = components;

    className = classnames(className, 'transition');

    return (
        <TransitionGroup {...{ className, component: wrapper }}>
            {CSSTransition({ ...rest, component: element })}
        </TransitionGroup>
    );
};

export { CSSTransition };
export default Transition;
