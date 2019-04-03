import {IProps as ICSSTransition} from '@Component/CSSTransition/spec';

export interface IProps extends ICSSTransition {
  component?: keyof JSX.IntrinsicElements;
}
