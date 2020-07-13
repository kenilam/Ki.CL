import * as CSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

export type ClassName = ClassNames<'default' | 'resizable'>;

export type Enter = CSSTransition.Enter;

export type Props = React.TextareaHTMLAttributes<null> &
  Omit<CSSTransition.Props, 'type'> & {
    label?: string;
    resizable?: boolean;
    transitionType: CSSTransition.Type
  };
