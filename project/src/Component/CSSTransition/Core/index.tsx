import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import {CSSTransition as Origin} from 'react-transition-group';
import ICSSTransition from './spec';
import Style from './Style';
import {addEndListener} from './Utility';

const CSSTransition: FunctionComponent<ICSSTransition.Props> = ({
  addEndListener: customEndListener,
  appear = true,
  children,
  classNames,
  mountOnEnter = true,
  onEnter,
  onEntered,
  onExit,
  onExited,
  unmountOnExit = true,
  ...props
}) => {
  const enteredHandler: ICSSTransition.OnEnter = (node, isAppearing) => {
    if (node) {
      node.classList.remove(
        Style.default,
        Style.appear,
        Style.appearDone,
        Style.enter,
        Style.enterDone
      );
    }
    
    onEntered && onEntered(node, isAppearing);
  };
  
  const exitedHandler: ICSSTransition.OnExit = (node) => {
    if (node) {
      node.classList.remove(
        Style.default,
        Style.exit,
        Style.exitDone
      );
    }
    
    onExited && onExited(node);
  };
  
  return (
    <Origin
      {...props}
      appear={appear}
      addEndListener={customEndListener || addEndListener}
      /**
      * A little trick to insert additional className from parent,
      * css-transition and css-transition-enter ans etc.
      **/
      classNames={
        classnames(classNames, Style.default, Style.default)
      }
      mountOnEnter={mountOnEnter}
      timeout={null}
      onEnter={onEnter}
      onEntered={enteredHandler}
      onExit={onExit}
      onExited={exitedHandler}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </Origin>
  );
};

export default CSSTransition;
