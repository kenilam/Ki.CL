// @flow
import React from 'react';
import { CSSTransition as CSSTransitionInstance } from 'react-transition-group';

import transitionDuration from 'get-transition-duration';

import classnames from 'classnames';

import './style.scss';

type Props = {
    className: string | Array | {},
    children: React.Node,
    component?: React.Node,
    keyValue: number | string,
    inValue: number | string,
    mountOnEnter?: boolean,
    unmountOnExit?: boolean
};

const defaultClassName = 'css-transition';

const addEndListener = endListenerTimer => (node, done) => {
    const duration = transitionDuration(node, true);

    if (duration === 0) {
        done();
    }

    window.clearTimeout(endListenerTimer);
    endListenerTimer = window.setTimeout(done, duration);
};

const removeDoneClasses = node => {
    node.classList.remove(`${defaultClassName}-exit-done`);
    node.classList.remove(`${defaultClassName}-enter-done`);
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
            onEntered={removeDoneClasses}
            onExited={removeDoneClasses}
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
