import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare namespace IInput {
  type ClassNames = IClassNames<'default'>;

  interface Props
    extends React.InputHTMLAttributes<null>,
      Omit<ICSSTransition.Props, 'type'> {
    label?: string;
  }
}

export default IInput;
