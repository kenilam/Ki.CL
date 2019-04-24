import * as ITransition from '@Component/Transition/spec';
import {RouteComponentProps} from 'react-router-dom';

declare module IRouter {
  interface Component extends RouteComponentProps {
  }
  
  interface Props extends ITransition.Props {
    routeIndex: number;
  }
}

export = IRouter;
