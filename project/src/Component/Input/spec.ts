import * as CSSTransition from '@/Component/CSSTransition/spec';
import { InputHTMLAttributes } from 'react';

export type ClassName = ClassNames<'default'>;

export type Enter = CSSTransition.Enter;

export type Props = InputHTMLAttributes<null> &
  Omit<CSSTransition.Props, 'type'> & {
    label?: string;
    transitionType?: CSSTransition.Type
  };
