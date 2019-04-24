import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

declare module ICSSTransition {
  interface ClassNames extends IClassNames {
  
  }
  
  interface Props extends Partial<CSSTransitionProps> {
    transitionIn?: boolean;
    transitionKey?: string;
    transitionStyle?: keyof TransitionStyle;
  }
  
  interface TransitionStyle {
    custom: string;
    fade: string;
    slideUp: string;
    
    [key: string]: string;
  }
}

export = ICSSTransition;
