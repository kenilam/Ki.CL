import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare module ITextArea {
  interface ClassNames extends IClassNames {
    default: string;
    resizable: string;
  }
  
  interface Props extends Omit<React.TextareaHTMLAttributes<null>, 'type'>, ICSSTransition.Props {
    label?: string;
    resizable?: boolean;
  }
}

export default ITextArea;
