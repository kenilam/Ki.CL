import classnames from 'classnames';
import React from 'react';
import {CSSTransition as Origin} from 'react-transition-group';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import ICSSTransition from './spec';
import Style, {TransitionStyle} from './Style';
import {addEndListener, classNameModifier} from './Utility';

const CSSTransition: React.FunctionComponent<ICSSTransition.Props> = (
  {
    appear = true,
    classNames,
    children,
    mountOnEnter = true,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    timeout = null,
    transitionIn,
    transitionKey,
    transitionStyle = 'custom',
    unmountOnExit = true
  }
) => {
  const inValue = transitionIn instanceof Function ? transitionIn() : transitionIn;
  const style = transitionStyle instanceof Function ? transitionStyle() : TransitionStyle.style[transitionStyle];
  
  const onEnterHandler: EnterHandler = (node, isAppearing) => {
    classNameModifier.addDefault(node, style);
    onEnter && onEnter(node, isAppearing);
  };
  
  const onEnteredHandler: EnterHandler = (node, isAppearing) => {
    classNameModifier.removeDone(node, style);
    onEntered && onEntered(node, isAppearing);
  };
  
  const onExitHandler: ExitHandler = (node) => {
    classNameModifier.addDefault(node, style);
    onExit && onExit(node);
  };
  
  return (
    <Origin
      addEndListener={!timeout && addEndListener}
      appear={appear}
      classNames={classnames(classNames, Style.cssTransition)}
      in={inValue}
      key={transitionKey}
      mountOnEnter={mountOnEnter}
      onEnter={onEnterHandler}
      onEntered={onEnteredHandler}
      onEntering={onEntering}
      onExit={onExitHandler}
      onExited={onExited}
      onExiting={onExiting}
      timeout={timeout}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </Origin>
  );
};

export {Style, TransitionStyle};
export default CSSTransition;
