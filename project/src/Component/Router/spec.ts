import ICSSTransition from '@/Component/CSSTransition/spec';
import ITransitionStyle from '@/Component/CSSTransition/Style/TransitionStyle/spec';
import ITransition from '@/Component/Transition/spec';
import {RouteComponentProps} from 'react-router-dom';

declare module IRouter {
  interface Component extends RouteComponentProps {
  }
  
  type OnEnter = ICSSTransition.OnEnter;
  type OnExit = ICSSTransition.OnExit;
  
  type TransitionStyleFunction = (
    props?: Partial<RouteComponentProps>
  ) => ITransitionStyle.Key;
  
  interface Props extends ITransition.Props {
    routeIndex: number;
    timeout?: number;
    transitionStyle?: TransitionStyleFunction | ICSSTransition.TransitionStyle;
  }
}

export default IRouter;
