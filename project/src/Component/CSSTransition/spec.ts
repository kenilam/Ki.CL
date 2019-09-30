import {CSSTransitionClassNames, CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {EndHandler, EnterHandler, ExitHandler} from 'react-transition-group/Transition';

declare module ICSSTransition {
  interface ClassNames extends CSSTransitionClassNames {
    default: string;
  }
  
  type OnEnter = EnterHandler;
  type OnExit = ExitHandler;
  type AddEndListener = EndHandler;
  
  interface Props extends Omit<CSSTransitionProps, 'timeout'> {
    timeout?: number | { appear?: number, enter?: number, exit?: number };
  }
}

export default ICSSTransition;
