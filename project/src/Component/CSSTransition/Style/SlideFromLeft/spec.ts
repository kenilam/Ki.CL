import ISelector from '@/Component/CSSTransition/Style/Selector/spec';

declare module ISlideFromLeft {
  interface ClassNames extends ISelector.ClassNames {
  }
  
  type OnEnter = ISelector.OnEnter;
  type OnExit = ISelector.OnExit;
  
  interface Props extends ISelector.Props {
  }
}

export default ISlideFromLeft;