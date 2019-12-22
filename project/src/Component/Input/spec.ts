import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare module IInput {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  interface Props extends Omit<ICSSTransition.Props, 'in' | 'type'>, React.InputHTMLAttributes<null> {
    label?: string;
    transitionIn: boolean;
    transitionType?: ICSSTransition.Type;
  }
}

export default IInput;
