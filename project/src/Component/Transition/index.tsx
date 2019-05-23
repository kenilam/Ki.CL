import {CSSTransition} from '@Component';
import classnames from 'classnames';
import React from 'react';
import {TransitionGroup} from 'react-transition-group';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import * as ITransition from './spec';
import Style from './Style';

const Transition: React.FunctionComponent<ITransition.Props> = ({
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
}) => {
  const className = classnames(classNames, Style.transition);
  
  const onEnterHandler: EnterHandler = (node, isAppearing) => {
    onEnter && onEnter(node, isAppearing);
    
    if (!node || !node.parentElement) {
      return;
    }
    
    node.parentElement.classList.add(...className.split(' '));
  };
  
  const onEnteredHandler: EnterHandler = (node, isAppearing) => {
    onEntered && onEntered(node, isAppearing);
    
    if (!node || !node.parentElement) {
      return;
    }
    
    node.parentElement.classList.remove(...className.split(' '));
  };
  
  const onExitHandler: ExitHandler = (node) => {
    onExit && onExit(node);
    
    if (!node || !node.parentElement) {
      return;
    }
    
    node.parentElement.classList.add(...className.split(' '));
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
        transitionStyle
      })}
    </TransitionGroup>
  );
};

export default Transition;
