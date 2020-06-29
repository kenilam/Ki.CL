import CSSTransition from '@/Component/CSSTransition/spec';
import State from './State/spec';

declare module Spec {
  type ClassName = ClassNames<'loading'>;

  type Actions = State.Actions;
  type Type = CSSTransition.Type;
  type Props = unknown;
}

export default Spec;
