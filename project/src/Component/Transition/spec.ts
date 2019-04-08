import {IProps as ICSSTransition} from '@Component/CSSTransition/spec';
import {ElementType} from 'react';
import {ComponentTransitionGroupProps} from 'react-transition-group/TransitionGroup';

interface IComponent extends ComponentTransitionGroupProps<ElementType> {
}

export interface IProps extends Partial<IComponent>, ICSSTransition {
}
