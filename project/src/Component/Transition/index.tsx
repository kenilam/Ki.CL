import {CSSTransition} from '@/Component';
import classnames from 'classnames';
import React from 'react';
import {TransitionGroup} from 'react-transition-group';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import ITransition from './spec';
import Style from './Style';

const Transition: React.FunctionComponent<ITransition.Props> = (
  {
    appear,
    classNames,
    children,
    component = React.Fragment,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    transitionIn,
    transitionKey,
    transitionStyle,
    unmountOnExit,
  }
) => {
  const className = classnames(classNames, Style.transition);
  
  const onEnterHandler: EnterHandler = (node, isAppearing) => {
    if (node && node.parentElement) {
      node.parentElement.classList.add(...className.split(' '));
    }
    
    onEnter && onEnter(node, isAppearing);
  };
  
  const onEnteredHandler: EnterHandler = (node, isAppearing) => {
    onEntered && onEntered(node, isAppearing);
    
    if (node && node.parentElement) {
      node.parentElement.classList.remove(...className.split(' '));
    }
  };
  
  const onExitHandler: ExitHandler = (node) => {
    onExit && onExit(node);
  };
  
  return (
    <TransitionGroup component={component}>
      {CSSTransition({
        appear,
        children,
        onEnter: onEnterHandler,
        onEntered: onEnteredHandler,
        onEntering,
        onExit: onExitHandler,
        onExited,
        onExiting,
        transitionIn,
        transitionKey,
        transitionStyle,
        unmountOnExit
      })}
    </TransitionGroup>
  );
};

export default Transition;
