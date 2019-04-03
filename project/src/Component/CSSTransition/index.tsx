import classnames from 'classnames';
import * as React from 'react';
import {CSSTransition as Origin} from 'react-transition-group';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import {IProps} from './spec';
import {className} from './Style';
import {addEndListener, classNameModifier} from './Utility';

const CSSTransition: React.FunctionComponent<IProps> = ({
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
  unmountOnExit = true
}) => {
  const onEnterHandler: EnterHandler = (node, isAppearing) => {
    classNameModifier.addDefault(node, classNames);
    onEnter && onEnter(node, isAppearing);
  };
  
  const onEnteredHandler: EnterHandler = (node, isAppearing) => {
    classNameModifier.removeDone(node);
    onEntered && onEntered(node, isAppearing);
  };
  
  const onExitedHandler: ExitHandler = node => {
    classNameModifier.removeDone(node);
    onExited && onExited(node);
  };
  
  return (
    <Origin
      addEndListener={!timeout && addEndListener}
      appear={appear}
      classNames={classnames(classNames, className)}
      in={transitionIn}
      key={transitionKey}
      mountOnEnter={mountOnEnter}
      onEnter={onEnterHandler}
      onEntered={onEnteredHandler}
      onEntering={onEntering}
      onExit={onExit}
      onExited={onExitedHandler}
      onExiting={onExiting}
      timeout={timeout}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </Origin>
  );
};

export default CSSTransition;
