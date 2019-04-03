import {IProps as ITransition} from '@Component/Transition/spec';
import {RouteComponentProps} from 'react-router-dom';

export interface IComponent extends RouteComponentProps {
}

export interface IProps extends ITransition {
  routeIndex?: number;
}
