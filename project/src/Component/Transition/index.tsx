import CSSTransition from '@/Component/CSSTransition';
import React, {Fragment, FunctionComponent} from 'react';
import {TransitionGroup as Origin} from 'react-transition-group';
import ITransition from './spec';
import Style from './Style';
import {getTransitionClassNameByType} from './Utility';

const Transition: FunctionComponent<ITransition.Props> = ({
  addEndListener,
  appear = true,
  children,
  childFactory,
  transitionKey,
  onEnter,
  onEntered,
  type,
  ...props
}) => {
  const childNodes = React.Children.toArray(children) as {
    props: ITransition.ChildActions
  }[];
  
  const className = getTransitionClassNameByType(type);
  
  const enterHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (node && !addEndListener) {
      node.parentElement.className = '';
      node.parentElement.classList.add(
        Style.default, className
      );
    }
    
    onEnter && onEnter(node, isAppearing);
    
    childNodes.forEach(
      ({props: {onEnter}}) => {
        onEnter && onEnter(node, isAppearing);
      }
    )
  };
  
  const enteredHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (node && !addEndListener) {
      node.parentElement.className = '';
    }
    
    onEntered && onEntered(node, isAppearing);
    
    childNodes.forEach(
      ({props: {onEntered}}) => {
        onEntered && onEntered(node, isAppearing);
      }
    )
  };
  
  const exitHandler: ITransition.OnEnter = node => {
    childNodes.forEach(
      ({props: {onExit}}) => {
        onExit && onExit(node);
      }
    )
  };
  
  const exitedHandler: ITransition.OnEnter = node => {
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
              onEntered={enteredHandler}
              onExit={exitHandler}
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
