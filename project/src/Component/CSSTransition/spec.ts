import ICore from './Core/spec';
import IStyle from './Style/spec';

declare namespace ICSSTransition {
  interface ClassNames extends ICore.ClassNames {
    default: string;
  }

  type In = IStyle.In;
  type Type = IStyle.Type;
  type OnEnter = ICore.OnEnter;
  type OnExit = ICore.OnExit;

  interface Events {
    onEnter?: OnEnter;
    onEntering?: OnEnter;
    onEntered?: OnEnter;
    onExit?: OnExit;
    onExiting?: OnExit;
    onExited?: OnExit;
  }

  interface Props extends ICore.Props {
    in: In;
    type?: Type;
  }
}

export default ICSSTransition;
