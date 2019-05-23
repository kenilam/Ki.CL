import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

declare module ICSSTransition {
  interface ClassNames extends IClassNames {
    cssTransition: string;
    appear: string;
    appearActive: string;
    appearDone: string;
    enter: string;
    enterActive: string;
    enterDone: string;
    exit: string;
    exitActive: string;
    exitDone: string;
  }
  
  interface Props extends Partial<CSSTransitionProps> {
    transitionIn?: boolean;
    transitionKey?: string;
    transitionStyle?: keyof TransitionStyle;
  }
  
  interface TransitionStyle {
    custom: string;
    fade: string
    slideUp: string;
    slideDown: string;
    
    [key: string]: string;
  }
}

export = ICSSTransition;
