import CSSTransition from '@/Components/CSSTransition/spec';

declare module Spec {
  type ClassName = ClassNames<'default'>;

  type TransitionTypes = {
    [path: string]: CSSTransition.Type;
  };

  type Props = unknown;
}

export default Spec;
