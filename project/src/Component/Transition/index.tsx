import CSSTransition from '@/Component/CSSTransition';
import React, {Fragment, FunctionComponent, ReactElement} from 'react';
import {TransitionGroup as Origin} from 'react-transition-group';
import ITransition from './spec';
import Style from './Style';

const Transition: FunctionComponent<ITransition.Props> = ({
  appear = true,
  children,
  classNames,
  onEntered,
  onExited,
  addEndListener: customEndListener,
  ...props
}) => {
  const enterHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (node) {
      node.parentElement.classList.add(Style.default);
    }
    
    onEntered && onEntered(node, isAppearing);
  };
  
  const enteredHandler: ITransition.OnExit = (node) => {
    if (node) {
      node.parentElement.classList.remove(Style.default);
    }
    
    onExited && onExited(node);
  };
  
  return (
    <Origin
      component={Fragment}
    >
      {
        React.Children.toArray(
          children
        ).map(
          (child: ReactElement) => (
            <CSSTransition
              {...props}
              classNames={classNames}
              key={child.key}
              onEnter={enterHandler}
              onEntered={enteredHandler}
            >
              {child}
            </CSSTransition>
          )
        )
      }
    </Origin>
  );
};

export default Transition;
