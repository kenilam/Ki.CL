declare namespace Spec {
  interface Style {
    [name: string]: any;
  }

  type Cancel = () => void;
  type Trigger<T> = () => Promise<T>;

  type Fetch<T> = {
    cancel: Cancel;
    trigger: Trigger<T>;
  };
}

export default Spec;
