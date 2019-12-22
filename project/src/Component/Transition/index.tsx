import CSSTransition from '@/Component/CSSTransition';
import React, {Fragment, FunctionComponent} from 'react';
import {TransitionGroup as Origin} from 'react-transition-group';
import ITransition from './spec';
import './Style';
import {classNames, transitionSizes} from './Utility';

const Transition: FunctionComponent<ITransition.Props> = ({
  addEndListener,
  appear = true,
  children,
  childFactory,
  transitionKey,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  type,
  ...props
}) => {
  const childNodes = React.Children.toArray(children) as {
    props: ITransition.ChildActions
  }[];
  
  const className = classNames.getTransitionClassNameByType(type);
  
  const enterHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (!addEndListener) {
      classNames.add(node, className);
    }
    
    transitionSizes.set(node);
    
    onEnter && onEnter(node, isAppearing);
    
    childNodes.forEach(
      ({props: {onEnter}}) => {
        onEnter && onEnter(node, isAppearing);
      }
    )
  };
  
  const enteringHandler: ITransition.OnEnter = (node, isAppearing) => {
    onEntering && onEntering(node, isAppearing);
    
    childNodes.forEach(
      ({props: {onEntering}}) => {
        onEntering && onEntering(node, isAppearing);
      }
    )
  };
  
  const enteredHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (!addEndListener) {
      classNames.remove(node, className);
    }
    
    transitionSizes.unset(node);
    
    onEntered && onEntered(node, isAppearing);
    
    childNodes.forEach(
      ({props: {onEntered}}) => {
        onEntered && onEntered(node, isAppearing);
      }
    )
  };
  
  const exitHandler: ITransition.OnExit = node => {
    onExit && onExit(node);
    
    childNodes.forEach(
      ({props: {onExit}}) => {
        onExit && onExit(node);
      }
    )
  };
  
  const exitingHandler: ITransition.OnExit = node => {
    onExiting && onExiting(node);
    
    childNodes.forEach(
      ({props: {onExiting}}) => {
        onExiting && onExiting(node);
      }
    )
  };
  
  const exitedHandler: ITransition.OnExit = node => {
    onExited && onExited(node);
    
    childNodes.forEach(
      ({props: {onExited}}) => {
        onExited && onExited(node);
      }
    )
  };
  
  return (
    <Origin childFactory={childFactory} component={Fragment}>
      {
        childNodes.map(
          (child, index) => (
            <CSSTransition
              {...props}
              addEndListener={addEndListener}
              key={transitionKey || index}
              onEnter={enterHandler}
              onEntering={enteringHandler}
              onEntered={enteredHandler}
              onExit={exitHandler}
              onExiting={exitingHandler}
              onExited={exitedHandler}
              type={type}
            >
              {child}
            </CSSTransition>
          )
        )
      }
    </Origin>
  );
};

Transition.defaultProps = {
  type: 'custom'
};

export default Transition;
