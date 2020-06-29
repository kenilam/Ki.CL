import CSSTransition from '@/Component/Transition/spec';

declare module Spec {
  type ClassName = ClassNames<'default'>;

  type Props = Omit<CSSTransition.Props, 'type'>;
}

export default Spec;
