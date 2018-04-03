import React from 'react';
import { CSSTransition as CSSTransitionInstance } from 'react-transition-group';

import transitionDuration from 'get-transition-duration';

import classnames from 'classnames';

import './style.scss';

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
    inValue
}) => {
    const Wrapper = component;

    className = classnames(className, defaultClassName);

    return (
        <CSSTransitionInstance
            classNames={defaultClassName}
            key={keyValue}
            in={inValue}
            addEndListener={addEndListener()}
        >
            <Wrapper className={className}>{children}</Wrapper>
        </CSSTransitionInstance>
    );
};

export default CSSTransition;
