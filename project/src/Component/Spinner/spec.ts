import ICSSTransition from '@/Component/CSSTransition/spec';

declare module ISpinner {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  interface Props extends ICSSTransition.Props {
  }
}

export default ISpinner;
