import ITransition from '@/Component/Transition/spec';
import {RouteComponentProps} from 'react-router-dom';

declare module IRouter {
  interface Component extends RouteComponentProps {
  }
  
  type OnEnter = ITransition.OnEnter;
  type OnExit = ITransition.OnExit;
  type ChildActions = ITransition.ChildActions;
  type ChildNode = {
    props: {
      children: {
        props: ChildActions
      }
    }
  }
  
  interface Props extends Omit<ITransition.Props, 'transitionKey'> {
    routeIndex: number;
  }
}

export default IRouter;
