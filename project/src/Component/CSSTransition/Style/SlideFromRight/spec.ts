import ISelector from '@/Component/CSSTransition/Style/Selector/spec';

declare module ISlideFromRight {
  interface ClassNames extends ISelector.ClassNames {
  }
  
  type OnEnter = ISelector.OnEnter;
  type OnExit = ISelector.OnExit;
  
  interface Props extends ISelector.Props {
  }
}

export default ISlideFromRight;
