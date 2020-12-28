import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { addEndListener } from './Utility';

import Style from './Style';

import * as Spec from './spec';

const DEFAULT_APPEAR = true;
const DEFAULT_COMPONENT = 'div';
const DEFAULT_TRANSITION = 'fade';

const Transition: React.FunctionComponent<Spec.Props> = ({
  appear = DEFAULT_APPEAR,
  children,
  component: Component = DEFAULT_COMPONENT,
  in: transitionIn,
  onEnter,
  onEntered,
  onEntering,
  onExit,
  onExited,
  onExiting,
  transition = DEFAULT_TRANSITION,
  transitionKey,
  ...props
}) => {
  const className = Style[transition] || Style[DEFAULT_TRANSITION];

  const done = {
    appear: `${className}-${Style['appear-done']}`,
    enter: `${className}-${Style['enter-done']}`,
    exit: `${className}-${Style['exit-done']}`,
  };

  const enteredHandler: Spec.Props['onEntered'] = (node, isAppearing) => {
    node?.classList.remove(className, done.appear, done.enter);

    if (!onEntered) {
      return;
    }

    onEntered(node, isAppearing);
  }

  const exitHandler: Spec.Props['onExit'] = (node) => {
    node?.classList.add(className);

    if (!onExit) {
      return;
    }

    onExit(node);
  }

  return (
    <CSSTransition
      appear={appear}
      classNames={className}
      in={transitionIn}
      key={transitionKey}
      onEnter={onEnter}
      onEntered={enteredHandler}
      onEntering={onEntering}
      onExit={exitHandler}
      onExited={onExited}
      onExiting={onExiting}
      addEndListener={addEndListener}
    >
      <Component
        {...props}
        className={className}
        data-component={Style.default}
      >
        {children}
      </Component>
    </CSSTransition>
  );
};

type TransitionProps = Spec.Props;

export { TransitionProps, TransitionGroup, DEFAULT_COMPONENT, DEFAULT_TRANSITION }
export default Transition;