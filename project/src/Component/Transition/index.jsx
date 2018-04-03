import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import CSSTransition from './CSSTransition';

import './style.scss';

const defaultClassName = 'transition';

const Transition = ({ className, childComponent, component, ...rest }) => {
    className = classnames(className, defaultClassName);

    return (
        <TransitionGroup {...{ className, component }}>
            {CSSTransition({ ...rest, component: childComponent })}
        </TransitionGroup>
    );
};

export { CSSTransition };
export default Transition;
