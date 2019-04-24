import * as ICSSTransition from '@Component/CSSTransition/spec';
import {ElementType} from 'react';
import {ComponentTransitionGroupProps} from 'react-transition-group/TransitionGroup';

declare module ITransition {
  interface ClassNames {
    transition: string;
  }
  
  interface Component extends ComponentTransitionGroupProps<ElementType> {
  
  }
  
  interface Props extends Partial<Component>, ICSSTransition.Props {
  
  }
}

export = ITransition;
