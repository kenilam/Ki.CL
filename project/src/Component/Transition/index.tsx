import CSSTransition from '@/Component/CSSTransition';
import React, {Fragment, FunctionComponent} from 'react';
import {TransitionGroup as Origin} from 'react-transition-group';
import ITransition from './spec';
import Style from './Style';

const Transition: FunctionComponent<ITransition.Props> = ({
  addEndListener,
  appear = true,
  children,
  transitionKey,
  onEnter,
  onEntered,
  ...props
}) => {
  const enterHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (node && !addEndListener) {
      node.parentElement.classList.add(Style.default);
    }
    
    onEnter && onEnter(node, isAppearing);
  };
  
  const enteredHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (node && !addEndListener) {
      node.parentElement.classList.remove(Style.default);
    }
    
    onEntered && onEntered(node, isAppearing);
  };
  
  return (
    <Origin component={Fragment}>
      {
        React.Children.toArray(children).map(
          (child, index) => (
            <CSSTransition
              {...props}
              addEndListener={addEndListener}
              key={transitionKey || index}
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
