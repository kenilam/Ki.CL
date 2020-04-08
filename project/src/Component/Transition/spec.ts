import ICSSTransition from '@/Component/CSSTransition/spec';

declare namespace ITransition {
  type ClassNames = IClassNames<'default'>;

  type OnEnter = ICSSTransition.OnEnter;
  type OnExit = ICSSTransition.OnExit;

  interface ChildActions {
    onEnter?: OnEnter;
    onEntering?: OnEnter;
    onEntered?: OnEnter;
    onExit?: OnExit;
    onExiting?: OnExit;
    onExited?: OnExit;
  }

  interface Props extends Omit<ICSSTransition.Props, 'classNames'> {
    transitionKey?: number | string;
  }
}

export default ITransition;
