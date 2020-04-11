import {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from 'react-transition-group/CSSTransition';
import {
  EndHandler,
  EnterHandler,
  ExitHandler,
} from 'react-transition-group/Transition';

declare namespace ICore {
  type ClassNames = CSSTransitionClassNames &
    IClassNames<'default' | 'standalone'>;

  type EndListener = EndHandler;
  type OnEnter = EnterHandler;
  type OnExit = ExitHandler;

  interface Props extends Omit<CSSTransitionProps, ''> {
    standalone?: boolean;
  }
}

export default ICore;
