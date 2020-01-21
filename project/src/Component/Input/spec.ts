import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare module IInput {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  interface Props extends Omit<React.InputHTMLAttributes<null>, 'type'>, ICSSTransition.Props {
    label?: string;
  }
}

export default IInput;
