import ICSSTransition from '@/Component/CSSTransition/spec';

declare namespace ICloseButton {
  type ClassNames = IClassNames<'default' | 'fontSize'>;

  type OnExit = ICSSTransition.OnExit;

  interface Props {
    onExit: OnExit;
  }
}

export default ICloseButton;
