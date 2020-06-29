import CSSTransition from '@/Component/CSSTransition/spec';

declare module Spec {
  type ClassName = ClassNames<'default'>;

  type Props = Omit<CSSTransition.Props, 'type'> & {
    disabled: boolean;
  };
}

export default Spec;
