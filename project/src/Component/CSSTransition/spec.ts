import ICore from './Core/spec';
import IStyle from './Style/spec';

declare module ICSSTransition {
  interface ClassNames extends ICore.ClassNames {
    default: string;
  }
  
  type Style = IStyle.Type;
  
  type AddEndListener = ICore.AddEndListener;
  type OnEnter = ICore.OnEnter;
  type OnExit = ICore.OnExit;
  
  interface Props extends ICore.Props {
    style?: Style;
  }
}

export default ICSSTransition;
