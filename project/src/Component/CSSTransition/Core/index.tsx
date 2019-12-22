import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import {CSSTransition} from 'react-transition-group';
import ICore from './spec';
import Style from './Style';
import {addEndListener, duration, getTransitionStyleByType} from './Utility';

const Core: FunctionComponent<ICore.Props> = ({
  addEndListener: customEndListener,
  appear = true,
  children,
  classNames,
  mountOnEnter = true,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  standAlone,
  unmountOnExit = true,
  ...props
}) => {
  const {
    props: {
      onEnter: childOnEnter,
      onEntering: childOnEntering,
      onEntered: childOnEntered,
      onExit: childOnExit,
      onExiting: childOnExiting,
      onExited: childOnExited,
    }
  } = children as {
    props: {
      onEnter: ICore.OnEnter,
      onEntering: ICore.OnEnter,
      onEntered: ICore.OnEnter,
      onExit: ICore.OnExit,
      onExiting: ICore.OnExit,
      onExited: ICore.OnExit,
    }
  };
  
  const enterHandler: ICore.OnEnter = (node, isAppearing) => {
    onEnter && onEnter(node, isAppearing);
    childOnEnter && childOnEnter(node, isAppearing);
  };
  
  const enteringHandler: ICore.OnEnter = (node, isAppearing) => {
    onEntering && onEntering(node, isAppearing);
    childOnEntering && childOnEntering(node, isAppearing);
  };
  
  const enteredHandler: ICore.OnEnter = (node, isAppearing) => {
    if (node && !customEndListener) {
      node.classList.remove(
        Style.default,
        Style.appear,
        Style.appearDone,
        Style.enter,
        Style.enterDone,
        Style.standAlone
      );
    }
    
    onEntered && onEntered(node, isAppearing);
    childOnEntered && childOnEntered(node, isAppearing);
  };
  
  const exitHandler: ICore.OnExit = node => {
    onExit && onExit(node);
    childOnExit && childOnExit(node);
  };
  
  const exitingHandler: ICore.OnExit = (node) => {
    onExiting && onExiting(node);
    childOnExiting && childOnExiting(node);
  };
  
  const exitedHandler: ICore.OnExit = (node) => {
    if (node && !customEndListener) {
      node.classList.remove(
        Style.default,
        Style.exit,
        Style.exitDone,
        Style.standAlone
      );
    }
    
    onExited && onExited(node);
    childOnExited && childOnExited(node);
  };
  
  return (
    <CSSTransition
      {...props}
      appear={appear}
      addEndListener={customEndListener || addEndListener}
      /**
      * A little trick to insert additional className from parent,
      * css-transition and css-transition-enter ans etc.
      **/
      classNames={
        classnames(
          classNames,
          Style.default,
          {[Style.standAlone]: standAlone},
          Style.default
        )
      }
      mountOnEnter={mountOnEnter}
      timeout={null}
      onEnter={enterHandler}
      onEntering={enteringHandler}
      onEntered={enteredHandler}
      onExit={exitHandler}
      onExiting={exitingHandler}
      onExited={exitedHandler}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </CSSTransition>
  );
};

Core.defaultProps = {
  standAlone: false
};

export {duration, getTransitionStyleByType};
export default Core;
