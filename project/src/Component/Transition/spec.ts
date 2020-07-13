import * as CSSTransition from '@/Component/CSSTransition/spec';
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup';

export type ClassName = ClassNames<
  'default' |
  'exitFilter' |
  'exitTransitionDuration' |
  'exitTransitionTimingFunction'
>;
export type Enter = CSSTransition.Enter;
export type Exit = CSSTransition.Exit;

export type Props = TransitionGroupProps & CSSTransition.Props;
