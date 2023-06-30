import React, { PropsWithChildren } from 'react';

// Libraries
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

// Transitions
import { TransitionGroup } from 'react-transition-group';

// Animation
import _Animation, { addEndListener } from '@/Animation';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--animation-group';

const createEventDispatcher = ({ animationKey, type }) => {
  const name = `${animationKey}.${type}`;
  const event = new CustomEvent(name, { bubbles: false });

  return { event, name };
};

const useEventDispatcher = ({ animationKey }) => {
  const enter = createEventDispatcher({ animationKey, type: 'enter' });
  const entered = createEventDispatcher({ animationKey, type: 'entered' });
  const entering = createEventDispatcher({ animationKey, type: 'entering' });
  const exit = createEventDispatcher({ animationKey, type: 'exit' });
  const exited = createEventDispatcher({ animationKey, type: 'exited' });
  const exiting = createEventDispatcher({ animationKey, type: 'exiting' });

  return { enter, entered, entering, exit, exited, exiting };
};

const AnimationGroup: React.FunctionComponent<
  PropsWithChildren<Pick<Spec.Props, 'animationStyle'>> & Spec.Props
> = ({
  animationKey,
  animationStyle,
  children,
  component = React.Fragment,
  onEnter: enterHandler,
  onEntered: enteredHandler,
  onEntering: enteringHandler,
  onExit: exitHandler,
  onExited: exitedHandler,
  onExiting: exitingHandler,
  ref,
  unmountOnExit = true,
  ...rest
}) => {
  const eventDispatcher = useEventDispatcher({ animationKey });

  const onEnter: EnterHandler<undefined> = (node, isAppearing) => {
    if (!node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.add(CLASS_NAME);
    }

    enterHandler?.(node, isAppearing);

    addEndListener(node, () => {
      window.dispatchEvent(eventDispatcher.enter.event);
    });
  };

  const onEntering: EnterHandler<undefined> = (node, isAppearing) => {
    enteringHandler?.(node, isAppearing);

    addEndListener(node, () => {
      window.dispatchEvent(eventDispatcher.entering.event);
    });
  };

  const onEntered: EnterHandler<undefined> = (node) => {
    if (node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.remove(CLASS_NAME);
    }

    enteredHandler?.(node);

    addEndListener(node, () => {
      window.dispatchEvent(eventDispatcher.entered.event);
    });
  };

  const onExit: ExitHandler<undefined> = (node) => {
    if (!node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.add(CLASS_NAME);
    }

    exitHandler?.(node);

    addEndListener(node, () => {
      window.dispatchEvent(eventDispatcher.exit.event);
    });
  };

  const onExited: ExitHandler<undefined> = (node) => {
    if (node?.parentElement?.classList.contains(CLASS_NAME)) {
      node?.parentElement?.classList.remove(CLASS_NAME);
    }

    exitedHandler?.(node);

    addEndListener(node, () => {
      window.dispatchEvent(eventDispatcher.exited.event);
    });
  };

  const onExiting: ExitHandler<undefined> = (node) => {
    exitingHandler?.(node);

    addEndListener(node, () => {
      window.dispatchEvent(eventDispatcher.exiting.event);
    });
  };

  const Animation = _Animation({
    ...rest,
    animationKey,
    animationStyle,
    children,
    className: `${CLASS_NAME}--animation`,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    unmountOnExit,
  });

  return (
    <TransitionGroup component={component} ref={ref}>
      {Animation}
    </TransitionGroup>
  );
};

export default AnimationGroup;
