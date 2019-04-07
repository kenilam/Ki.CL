import {IProps as ICSSTransition} from '@Component/CSSTransition/spec';
import {ElementType} from 'react';
import {ComponentTransitionGroupProps} from 'react-transition-group/TransitionGroup';

export interface IProps extends ComponentTransitionGroupProps<ElementType>, ICSSTransition {
}
