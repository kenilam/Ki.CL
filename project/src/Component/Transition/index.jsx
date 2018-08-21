// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import CSSTransition from './CSSTransition';

import './style.scss';

type className = String;

type elementAttrs = {};

type components = {
    className: Array<className> | className,
    element: String,
    wrapper: String,
    elementAttrs: elementAttrs
};

type Props = {
    className: Array<className> | className,
    childComponent: React.Node,
    components: components
};

const Transition = ({
    className,
    childComponent,
    components,
    ...rest
}: Props) => {
    const { wrapper, element, elementAttrs } = components;

    className = classnames(className, 'transition');

    return (
        <TransitionGroup {...{ className, component: wrapper }}>
            {CSSTransition({
                ...rest,
                ...elementAttrs,
                component: element,
                className: components.className
            })}
        </TransitionGroup>
    );
};

export { CSSTransition };
export default Transition;
