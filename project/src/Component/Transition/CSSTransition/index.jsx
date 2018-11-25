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
const enterClassName =`${defaultClassName}-enter`;
const exitClassName =`${defaultClassName}-exit`;

const addEndListener = endListenerTimer => (node, done) => {
    const nodes = Array.from(node.parentNode.querySelectorAll(`.${enterClassName}, .${exitClassName}`));

    const duration = Math.max(...nodes.map(n => transitionDuration(n, true)));

    if (duration === 0) {
        done();
    }

    window.clearTimeout(endListenerTimer);
    endListenerTimer = window.setTimeout(done, duration);
};

const removeDoneClasses = node => {
    node.classList.remove(`${enterClassName}-done`);
    node.classList.remove(`${exitClassName}-done`);
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

    className = classnames(defaultClassName, className);

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
