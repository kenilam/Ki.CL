declare namespace IGlobalHeader {
  type ClassNames = IClassNames<'default'>;

  interface Child {
    className?: string;
    ['data-component']?: ClassNames['default'];
  }

  interface Props extends Child {
    useClassName?: boolean;
  }
}

export default IGlobalHeader;
