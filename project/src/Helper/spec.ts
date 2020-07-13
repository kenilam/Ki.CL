export type Style = {
  [name: string]: number | string;
}

export type Cancel = () => void;
export type Trigger<T> = () => Promise<T>;

export type Fetch<T> = {
  cancel: Cancel;
  trigger: Trigger<T>;
};

export type RandomNumber = (
  prop?: {
    start: number,
    end: number,
  }
) => number;
