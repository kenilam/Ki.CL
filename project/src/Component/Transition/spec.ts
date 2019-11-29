import ICSSTransition from '@/Component/CSSTransition/spec';

declare module ITransition {
  interface ClassNames {
    default: string;
  }
  
  type OnEnter = ICSSTransition.OnEnter;
  type OnExit = ICSSTransition.OnExit;
  
  interface ChildActions {
    onEnter?: OnEnter;
    onEntered?: OnEnter;
    onExit?: OnExit;
    onExited?: OnExit;
  }
  
  interface Props extends Omit<ICSSTransition.Props, 'classNames'> {
    transitionKey?: number | string;
  }
}

export default ITransition;
