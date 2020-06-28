import CSSTransition from '@/Components/CSSTransition/spec';
import React from 'react';

declare module Spec {
  type ClassName = ClassNames<'default'>;

  type Enter = CSSTransition.Enter;

  type Props = React.ButtonHTMLAttributes<null> &
    Omit<CSSTransition.Props, 'type'> & {
      transitionType?: CSSTransition.Type;
    };
}

export default Spec;
