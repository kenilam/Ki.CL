import classnames from 'classnames';
import React from 'react';
import { CSSTransition as Origin } from 'react-transition-group';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import * as ICSSTransition from './spec';
import Style, { TransitionStyle, TransitionStyleName } from './Style';
import { addEndListener, classNameModifier } from './Utility';

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
  const onEnterHandler: EnterHandler = ( node, isAppearing ) => {
    classNameModifier.addDefault( node, TransitionStyle[ transitionStyle ] );
    onEnter && onEnter( node, isAppearing );
  };
  
  const onEnteredHandler: EnterHandler = ( node, isAppearing ) => {
    classNameModifier.removeDone( node, TransitionStyle[ transitionStyle ] );
    onEntered && onEntered( node, isAppearing );
  };
  
  const onExitHandler: ExitHandler = ( node ) => {
    classNameModifier.addDefault( node, TransitionStyle[ transitionStyle ] );
    onExit && onExit( node );
  };
  
  return (
    <Origin
      addEndListener={!timeout && addEndListener}
      appear={appear}
      classNames={classnames( classNames, Style.cssTransition )}
      in={transitionIn}
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

export { Style, TransitionStyle, TransitionStyleName };
export default CSSTransition;
