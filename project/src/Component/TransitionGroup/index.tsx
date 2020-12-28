import React from 'react';
import { TransitionGroup as Origin } from 'react-transition-group';

import { Transition } from '@/Component';

import Style from './Style';

import * as Spec from './spec';

const TransitionGroup: React.FunctionComponent<Spec.Props> = (
  {
    onEnter,
    onEntered,
    transitionKey,
    ...props
  }
) => {
  const enterHandler: Spec.Props['onEnter'] = (node, isAppearing) => {
    node?.parentNode?.setAttribute('data-dynamic-component', Style.default);

    if (!onEnter) {
      return;
    }

    onEnter(node, isAppearing);
  }

  const enteredHandler: Spec.Props['onEntered'] = (node) => {
    node?.parentNode?.removeAttribute('data-dynamic-component');

    if (!onEntered) {
      return;
    }

    onEntered(node);
  }

  const Component = (
    Transition({ ...props, transitionKey, onEnter: enterHandler, onEntered: enteredHandler })
  ) || <></>;

  return (
    <Origin component={React.Fragment}>
      {Component}
    </Origin>
  );
};

export default TransitionGroup;