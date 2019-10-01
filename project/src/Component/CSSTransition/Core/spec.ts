import {CSSTransitionClassNames, CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {EndHandler, EnterHandler, ExitHandler} from 'react-transition-group/Transition';

declare module ICore {
  interface ClassNames extends CSSTransitionClassNames {
    default: string;
  }
  
  type AddEndListener = EndHandler;
  type OnEnter = EnterHandler;
  type OnExit = ExitHandler;
  
  interface Props extends Omit<CSSTransitionProps, 'timeout'> {
    timeout?: number | { appear?: number, enter?: number, exit?: number };
  }
}

export default ICore;
