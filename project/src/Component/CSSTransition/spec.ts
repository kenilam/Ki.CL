import ICore from './Core/spec';
import IStyle from './Style/spec';

declare module ICSSTransition {
  interface ClassNames extends ICore.ClassNames {
    default: string;
  }
  
  type Type = IStyle.Type;
  
  type OnEnter = ICore.OnEnter;
  type OnExit = ICore.OnExit;
  
  interface Events {
    onEnter?: OnEnter;
    onEntered?: OnEnter;
    onExit?: OnExit;
    onExited?: OnExit;
  }
  
  interface Props extends ICore.Props {
    type?: Type;
  }
}

export default ICSSTransition;
