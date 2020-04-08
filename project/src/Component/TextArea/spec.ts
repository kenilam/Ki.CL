import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare namespace ITextArea {
  type ClassNames = IClassNames<'default' | 'resizable'>;

  interface Props
    extends Omit<React.TextareaHTMLAttributes<null>, 'type'>,
      ICSSTransition.Props {
    label?: string;
    resizable?: boolean;
  }
}

export default ITextArea;
