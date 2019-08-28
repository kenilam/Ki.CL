import ICSSTransition from "@/Component/CSSTransition/spec";

declare module ISpinner {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  interface Props {
    transitionIn: ICSSTransition.TransitionIn,
    onExited?: ICSSTransition.OnExit
  }
}

export default ISpinner;
