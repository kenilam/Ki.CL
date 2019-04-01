import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export interface IProps extends Partial<CSSTransitionProps> {
  transitionIn?: boolean;
  transitionKey?: string;
}
