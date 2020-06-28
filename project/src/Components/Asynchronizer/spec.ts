import CSSTransition from '@/Components/CSSTransition/spec';
import React from 'react';

declare module Spec {
  type ClassName = ClassNames<'delay'>;

  type AwaitFor = string;
  type PreventFor = boolean;
  type Children<T> = (data: Data<T>) => React.ReactNode;

  type Status = {
    error?: boolean;
    success?: boolean;
  };

  type Data<T> = Status & {
    result?: T;
  };

  type Props<T> = Pick<
    CSSTransition.Props,
    'onEnter' | 'onEntered' | 'onEntering' | 'onExit' | 'onExited' | 'onExiting'
  > & {
    awaitFor: AwaitFor;
    awaitForOptions?: RequestInit;
    preventFor?: PreventFor;
    children: Children<T>;
    onError?: (data: Data<T>) => void;
    onSuccess?: (data: Data<T>) => void;
    transitionType?: CSSTransition.Type;
  };
}

export default Spec;
