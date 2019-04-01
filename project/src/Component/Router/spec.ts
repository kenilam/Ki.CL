import { RouteComponentProps } from 'react-router-dom';

import { IProps as ITransition } from '@Component/Transition/spec';

export interface IComponent extends RouteComponentProps {}
export interface IProps extends ITransition {
  routeIndex?: number;
}
