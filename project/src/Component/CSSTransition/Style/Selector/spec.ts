import ICore from '@/Component/CSSTransition/Core/spec';

declare module ISelector {
  interface ClassNames extends ICore.ClassNames {
  }
  
  type Style = string;
  
  type OnEnter = ICore.OnEnter;
  type OnExit = ICore.OnExit;
  
  interface Props extends ICore.Props {
  }
}

export default ISelector;
