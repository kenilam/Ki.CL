import * as CSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

export type ClassName = ClassNames<'default'>;

export type Enter = CSSTransition.Enter;

export type Props = React.ButtonHTMLAttributes<null> &
  Omit<CSSTransition.Props, 'type'> & {
    transitionType?: CSSTransition.Type
  };
