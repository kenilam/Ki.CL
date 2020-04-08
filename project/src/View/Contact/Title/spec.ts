import ICSSTransition from '@/Component/CSSTransition/spec';

declare namespace ITitle {
  type ClassNames = IClassNames<'default'>;

  interface Props extends Omit<ICSSTransition.Props, 'type'> {}
}

export default ITitle;
