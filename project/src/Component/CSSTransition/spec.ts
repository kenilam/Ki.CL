import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

export interface IProps extends Partial<CSSTransitionProps> {
  transitionKey: string;
}
