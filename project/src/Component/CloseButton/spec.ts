import ICSSTransition from '@/Component/CSSTransition/spec';

declare module ICloseButton {
  interface ClassNames extends IClassNames {
    default: string;
    fontSize: string;
  }
  
  type OnExit = ICSSTransition.OnExit;
  
  interface Props {
    onExit: OnExit
  }
}

export default ICloseButton;
