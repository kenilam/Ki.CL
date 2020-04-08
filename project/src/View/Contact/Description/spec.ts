import ICSSTransition from '@/Component/CSSTransition/spec';

declare namespace IDescription {
  type ClassNames = IClassNames<'default'>;

  interface Props extends Omit<ICSSTransition.Props, 'type'> {}
}

export default IDescription;
