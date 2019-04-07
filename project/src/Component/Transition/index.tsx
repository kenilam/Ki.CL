import {CSSTransition} from '@Component';
import classnames from 'classnames';
import * as React from 'react';
import {TransitionGroup} from 'react-transition-group';
import {EnterHandler} from 'react-transition-group/Transition';
import {IProps} from './spec';
import Style from './Style';

const Transition: React.FC<IProps> = ({
  appear,
  classNames,
  children,
  component,
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
  
  return (
    <TransitionGroup component={component}>
      {CSSTransition({
        appear,
        children,
        onEnter: onEnterHandler,
        onEntered,
        onEntering,
        onExit,
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
