declare module Spec {
  type Style = {
    [name: string]: number | string;
  }

  type Cancel = () => void;
  type Trigger<T> = () => Promise<T>;

  type Fetch<T> = {
    cancel: Cancel;
    trigger: Trigger<T>;
  };

  type RandomNumber = (
    prop?: {
      start: number,
      end: number,
    }
  ) => number;
}

export default Spec;
