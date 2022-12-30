import React, { PropsWithChildren } from 'react';

// Libraries
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

// Transitions
import { TransitionGroup } from 'react-transition-group';

// Animation
import _Animation from '@/Animation';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--animation-group';

const AnimationGroup: React.FunctionComponent<
  PropsWithChildren & Spec.Props
> = ({
  animationKey,
  animationStyle,
  children,
  component = React.Fragment,
  onEnter: enterHandler,
  onEntered: enteredHandler,
  onExit: exitHandler,
  onExited: exitedHandler,
  ref,
  unmountOnExit = true,
  ...rest
}) => {
  const onEnter: EnterHandler<undefined> = (node, isAppearing) => {
    if (!node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.add(CLASS_NAME);
    }

    enterHandler?.(node, isAppearing);
  };

  const onEntered: EnterHandler<undefined> = (node) => {
    if (node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.remove(CLASS_NAME);
    }

    enteredHandler?.(node);
  };

  const onExit: ExitHandler<undefined> = (node) => {
    if (!node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.add(CLASS_NAME);
    }

    exitHandler?.(node);
  };

  const onExited: ExitHandler<undefined> = (node) => {
    if (node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.remove(CLASS_NAME);
    }

    exitedHandler?.(node);
  };

  const Animation = _Animation({
    ...rest,
    animationKey,
    animationStyle,
    children,
    className: `${CLASS_NAME}--animation`,
    onEnter,
    onEntered,
    onExit,
    onExited,
    unmountOnExit,
  });

  return (
    <TransitionGroup component={component} ref={ref}>
      {Animation}
    </TransitionGroup>
  );
};

export default AnimationGroup;
