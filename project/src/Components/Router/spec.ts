import Transition from '@/Components/Transition/spec';

declare module Spec {
  type Enter = Transition.Enter;
  type Exit = Transition.Exit;

  type UrlParam = boolean | number | string;
  type UrlParams<T extends string> = {
    [name in T]: UrlParam;
  };

  type Props = Transition.Props & {
    routeIndex: number;
  };
}

export default Spec;
