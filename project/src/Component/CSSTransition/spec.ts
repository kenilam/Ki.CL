import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {IProps as ITransitionStyle} from './Style/TransitionStyle/spec';

export interface IProps extends Partial<CSSTransitionProps> {
  transitionIn?: boolean;
  transitionKey?: string;
  transitionStyle?: keyof ITransitionStyle;
}
