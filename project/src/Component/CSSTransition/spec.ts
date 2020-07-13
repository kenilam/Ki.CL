import { Omit } from '@/spec.helpers';
import { Key } from 'react';
import {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from 'react-transition-group/CSSTransition';
import {
  EndHandler,
  EnterHandler,
  ExitHandler,
} from 'react-transition-group/Transition';

import * as Origin from './Type/spec';

export type ClassName = CSSTransitionClassNames &
  ClassNames<'default' | 'standalone'>;

export type Enter = EnterHandler<null>;
export type Exit = ExitHandler<null>;

export type AddEndListener = EndHandler<null>;

export type In = boolean;

export type Props = Omit<CSSTransitionProps, 'addEndListener'> & {
  addEndListener?: AddEndListener;
  standalone?: boolean;
  transitionKey?: Key;
  type?: Origin.Type;
};

export type Type = Origin.Type;

export type UseHandlersProps = {
  addEndListener?: AddEndListener;
  onEntered: Enter;
  onExited: Exit;
  type: Origin.Type;
};

export type UseHandlers = (
  props: UseHandlersProps
) => { onEntered: Enter; onExited: Exit };
