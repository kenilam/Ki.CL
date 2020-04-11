import ITransition from '@/Component/Transition/spec';
import { RouteComponentProps } from 'react-router-dom';

declare namespace IRouter {
  type Component = RouteComponentProps;

  type OnEnter = ITransition.OnEnter;
  type OnExit = ITransition.OnExit;

  type ChildActions = ITransition.ChildActions;
  type ChildNode = {
    props: {
      children: {
        props: ChildActions;
      };
    };
  };

  type UrlParam = boolean | number | string;
  type UrlParams<T> = {
    [name as keyof T]: UrlParam;
  };

  interface Props extends Omit<ITransition.Props, 'transitionKey'> {
    routeIndex: number;
  }
}

export default IRouter;
