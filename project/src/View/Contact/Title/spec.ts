import CSSTransition from '@/Components/CSSTransition/spec';
import { Omit } from '@/spec.helpers';

declare module Spec {
  type ClassName = ClassNames<'default'>;

  type Props = Omit<CSSTransition.Props, 'type'>;
}

export default Spec;
