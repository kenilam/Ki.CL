import ICSSTransition from '@/Component/CSSTransition/spec';

declare module ITransition {
  interface ClassNames {
    default: string;
  }
  
  type OnEnter = ICSSTransition.OnEnter;
  
  interface Props extends ICSSTransition.Props {
    transitionKey?: string;
  }
}

export default ITransition;
