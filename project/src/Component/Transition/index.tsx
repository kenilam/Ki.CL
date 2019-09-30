import CSSTransition from '@/Component/CSSTransition';
import ICSSTransition from '@/Component/CSSTransition/spec';
import React, {Fragment, FunctionComponent} from 'react';
import {TransitionGroup as Origin} from 'react-transition-group';
import ITransition from './spec';
import Style from './Style';

const Transition: FunctionComponent<ITransition.Props> = ({
  addEndListener: customEndListener,
  appear = true,
  children,
  classNames,
  transitionKey,
  onEnter,
  onEntered,
  ...props
}) => {
  const addEndListener: ICSSTransition.AddEndListener =
    customEndListener ? (node, done) => {
      done = () => {
        node.parentElement.classList.remove(Style.default);
        done();
      };
      
      node.parentElement.classList.add(Style.default);
      addEndListener(node, done);
    } : null;
  
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
    <Origin
      component={Fragment}
    >
      <CSSTransition
        {...props}
        addEndListener={addEndListener}
        classNames={classNames}
        key={transitionKey}
        onEnter={enterHandler}
        onEntered={enteredHandler}
      >
        {children}
      </CSSTransition>
    </Origin>
  );
};

export default Transition;
