import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare module ITextArea {
  interface ClassNames extends IClassNames {
    default: string;
    resizable: string;
  }
  
  interface Props extends Omit<ICSSTransition.Props, 'in' | 'type'>, React.TextareaHTMLAttributes<null> {
    label?: string;
    resizable?: boolean;
    transitionIn: boolean;
    transitionType?: ICSSTransition.Type;
  }
}

export default ITextArea;
