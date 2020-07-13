import { Type } from '@/Component/CSSTransition/spec';
import * as Transition from '@/Component/Transition/spec';

export type Enter = Transition.Enter;
export type Exit = Transition.Exit;

export type UrlParam = boolean | number | string;
export type UrlParams<T extends string> = {
  [name in T]: UrlParam;
};

export type Props = Omit<Transition.Props, 'type'> & {
  routeIndex: number;
  transitionType: Type;
};
