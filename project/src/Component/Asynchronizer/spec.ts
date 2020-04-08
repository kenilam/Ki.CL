import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare namespace IAsynchronizer {
  type ClassNames = IClassNames<'delay'>;

  type AwaitFor = string;
  type PendingFor = boolean;
  type Children<T> = (data: T) => React.ReactNode;

  type Status = {
    error?: boolean;
    success?: boolean;
  };

  type Data = {
    data?: any;
  };

  interface Props<T> extends Status {
    awaitFor: AwaitFor;
    awaitForOptions?: RequestInit;
    pendingFor?: PendingFor;
    children: Children<Data & Status>;
    transitionType?: ICSSTransition.Type;
  }
}

export default IAsynchronizer;
