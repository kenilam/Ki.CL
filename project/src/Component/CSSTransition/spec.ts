import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {EndHandler, EnterHandler, ExitHandler} from 'react-transition-group/Transition';

declare module ICSSTransition {
  interface ClassNames extends IClassNames {
    cssTransition: string;
    appear: string;
    appearActive: string;
    appearDone: string;
    enter: string;
    enterActive: string;
    enterDone: string;
    exit: string;
    exitActive: string;
    exitDone: string;
  }
  
  type OnEnter = EnterHandler;
  type OnExit = ExitHandler;
  
  interface Props extends Partial<CSSTransitionProps> {
    addEndListener?: EndHandler;
    onEnter?: EnterHandler;
    onEntering?: EnterHandler;
    onEntered?: EnterHandler;
    onExit?: ExitHandler;
    onExiting?: ExitHandler;
    onExited?: ExitHandler;
    transitionIn?: boolean;
    transitionKey?: string;
    transitionStyle?: keyof TransitionStyle;
  }
  
  interface TransitionStyle {
    custom: string;
    fade: string
    slideUp: string;
    slideDown: string;
    
    [key: string]: string;
  }
}

export = ICSSTransition;
