import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import {CSSTransition} from 'react-transition-group';
import ICore from './spec';
import Style from './Style';
import {addEndListener, duration} from './Utility';

const Core: FunctionComponent<ICore.Props> = ({
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
  const enteredHandler: ICore.OnEnter = (node, isAppearing) => {
    if (node && !customEndListener) {
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
  
  const exitedHandler: ICore.OnExit = (node) => {
    if (node && !customEndListener) {
      node.classList.remove(
        Style.default,
        Style.exit,
        Style.exitDone
      );
    }
    
    onExited && onExited(node);
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
    </CSSTransition>
  );
};

export {duration};
export default Core;
