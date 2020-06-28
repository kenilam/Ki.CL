import CSSTransition from '@/Components/CSSTransition/spec';
import React from 'react';

declare module Spec {
  type ClassName = ClassNames<'default' | 'resizable'>;

  type Enter = CSSTransition.Enter;

  type Props = React.TextareaHTMLAttributes<null> &
    Omit<CSSTransition.Props, 'type'> & {
      label?: string;
      resizable?: boolean;
      transitionType: CSSTransition.Type;
    };
}

export default Spec;
