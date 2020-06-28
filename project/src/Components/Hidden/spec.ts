declare module Spec {
  type ClassName = ClassNames<'default'>;

  type Child = {
    className?: string;
    ['data-component']?: ClassName['default'];
  };

  type Props = Child & {
    useClassName?: boolean;
  };
}

export default Spec;
