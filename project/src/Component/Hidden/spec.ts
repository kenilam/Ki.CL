export type ClassName = ClassNames<'default'>;

export type Child = {
  className?: string;
  ['data-component']?: ClassName['default'];
};

export type Props = Child & {
  useClassName?: boolean;
};
