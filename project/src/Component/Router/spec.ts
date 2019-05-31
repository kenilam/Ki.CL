import * as ICSSTransition from '@Component/CSSTransition/spec';
import * as ITransition from '@Component/Transition/spec';
import {RouteComponentProps} from 'react-router-dom';

declare module IRouter {
  interface Component extends RouteComponentProps {
  }
  
  type OnEnter = ICSSTransition.OnEnter;
  type OnExit = ICSSTransition.OnExit;
  
  interface Props extends ITransition.Props {
    routeIndex: number;
    timeout?: number;
  }
}

export = IRouter;
