import ICSSTransition from '@/Component/CSSTransition/spec';
import React from 'react';

declare module IAsynchronizer {
  interface ClassNames extends IClassNames {
    delay: string;
  }
  
  type AwaitFor = string;
  type PendingFor = boolean;
  type Children<T> = (data: T) => React.ReactNode;
  
  interface Props {
    awaitFor: AwaitFor,
    awaitForOptions?: RequestInit,
    pendingFor?: PendingFor,
    children: Children<any>,
    transitionType?: ICSSTransition.Type
  }
}

export default IAsynchronizer;
