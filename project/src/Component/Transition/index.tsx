import { CSSTransition } from '@/Component'
import React, { Fragment, FunctionComponent } from 'react';
import { TransitionGroup } from 'react-transition-group';
import './Style';
import { classNames, transitionSizes } from './Utility';
import { Enter, Props } from './spec';

const Transition: FunctionComponent<Props> = ({
  children,
  childFactory,
  onEnter: enterHandler,
  onEntered: enteredHandler,
  ...props
}) => {
  const onEnter: Enter = (node, isAppearing) => {
    classNames.add(node);
    transitionSizes.set(node);

    if (enterHandler) {
      enterHandler(node, isAppearing);
    }
  };

  const onEntered: Enter = (node, isAppearing) => {
    classNames.remove(node);
    transitionSizes.unset(node);

    if (enteredHandler) {
      enteredHandler(node, isAppearing);
    }
  };

  return (
    <TransitionGroup childFactory={childFactory} component={Fragment}>
      {
        CSSTransition({
          ...props,
          children,
          onEnter,
          onEntered
        })
      }
    </TransitionGroup>
  );
};

export default Transition;
