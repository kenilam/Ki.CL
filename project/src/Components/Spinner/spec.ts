import CSSTransition from '@/Components/CSSTransition/spec';

declare module Spec {
  type ClassName = ClassNames<'default' | 'withoverlay'>;

  type Props = CSSTransition.Props & {
    withOverlay?: boolean;
  };
}

export default Spec;
