// @flow
import React from 'react';
import { CSSTransition as CSSTransitionInstance } from 'react-transition-group';

import transitionDuration from 'get-transition-duration';

import classnames from 'classnames';

import './style.scss';

type Props = {
    className: string | Array | Object,
    children: React.Node,
    component?: React.Node,
    keyValue: Number | string,
    inValue: Number | string,
    mountOnEnter?: Boolean,
    unmountOnExit?: Boolean
};

const defaultClassName = 'css-transition';

const addEndListener = endListenerTimer => (node, done) => {
    const duration = transitionDuration(node);

    if (duration === 0) {
        done();
    }

    window.clearTimeout(endListenerTimer);
    endListenerTimer = window.setTimeout(() => done(), duration + 100);
};

const CSSTransition = ({
    className,
    children,
    component,
    keyValue,
    inValue,
    ...rest
}: Props) => {
    const Wrapper = component;

    className = classnames(className, defaultClassName);

    return (
        <CSSTransitionInstance
            classNames={className}
            key={keyValue}
            in={inValue}
            addEndListener={addEndListener()}
            {...rest}
        >
            <Wrapper {...{ className }}>{children}</Wrapper>
        </CSSTransitionInstance>
    );
};

CSSTransition.defaultProps = {
    component: 'div',
    mountOnEnter: true,
    unmountOnExit: true
};

export default CSSTransition;
