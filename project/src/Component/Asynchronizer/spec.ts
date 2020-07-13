import * as CSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

export type ClassName = ClassNames<'delay'>;

export type Data<T> = Status & {
  result?: T;
};

export type AwaitFor = string;
export type PreventFor = boolean;
export type Children<T> = (result: Data<T>) => React.ReactNode;
export type OnError<T> = (result: Data<T>) => void;
export type OnSuccess<T> = (result: Data<T>) => void;

export type Status = {
  error?: boolean;
  success?: boolean;
};

export type Props<T> = Pick<
  CSSTransition.Props,
  'onEnter' | 'onEntered' | 'onEntering' | 'onExit' | 'onExited' | 'onExiting'
> & {
  awaitFor: AwaitFor;
  awaitForOptions?: RequestInit;
  preventFor?: PreventFor;
  children: Children<T>;
  onError?: OnError<T>;
  onSuccess?: OnSuccess<T>;
  transitionType?: CSSTransition.Type;
};
