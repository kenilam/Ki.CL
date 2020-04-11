import CSSTransition from '@/Component/CSSTransition';
import React, { Fragment, FunctionComponent } from 'react';
import { TransitionGroup as Origin } from 'react-transition-group';
import ITransition from './spec';
import './Style';
import { classNames, transitionSizes } from './Utility';

const Transition: FunctionComponent<ITransition.Props> = ({
  addEndListener,
  children,
  childFactory,
  in: transitionIn,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  key,
  type,
}) => {
  const childNodes = React.Children.toArray(children) as {
    props: ITransition.ChildActions;
  }[];

  const className = classNames.getTransitionClassNameByType(type);

  const enterHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (!addEndListener) {
      classNames.add(node, className);
    }

    transitionSizes.set(node);

    if (onEnter) {
      onEnter(node, isAppearing);
    }

    childNodes.forEach(({ props: { onEnter } }) => {
      if (onEnter) {
        onEnter(node, isAppearing);
      }
    });
  };

  const enteringHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (onEntering) {
      onEntering(node, isAppearing);
    }

    childNodes.forEach(({ props: { onEntering } }) => {
      if (onEntering) {
        onEntering(node, isAppearing);
      }
    });
  };

  const enteredHandler: ITransition.OnEnter = (node, isAppearing) => {
    if (!addEndListener) {
      classNames.remove(node, className);
    }

    transitionSizes.unset(node);

    if (onEntered) {
      onEntered(node, isAppearing);
    }

    childNodes.forEach(({ props: { onEntered } }) => {
      if (onEntered) {
        onEntered(node, isAppearing);
      }
    });
  };

  const exitHandler: ITransition.OnExit = (node) => {
    if (onExit) {
      onExit(node);
    }

    childNodes.forEach(({ props: { onExit } }) => {
      if (onExit) {
        onExit(node);
      }
    });
  };

  const exitingHandler: ITransition.OnExit = (node) => {
    if (onExiting) {
      onExiting(node);
    }

    childNodes.forEach(({ props: { onExiting } }) => {
      if (onExiting) {
        onExiting(node);
      }
    });
  };

  const exitedHandler: ITransition.OnExit = (node) => {
    if (onExited) {
      onExited(node);
    }

    childNodes.forEach(({ props: { onExited } }) => {
      if (onExited) {
        onExited(node);
      }
    });
  };

  return (
    <Origin childFactory={childFactory} component={Fragment}>
      {childNodes.map((child, index) => (
        <CSSTransition
          addEndListener={addEndListener}
          key={key || index}
          in={transitionIn}
          onEnter={enterHandler}
          onEntering={enteringHandler}
          onEntered={enteredHandler}
          onExit={exitHandler}
          onExiting={exitingHandler}
          onExited={exitedHandler}
          type={type}
        >
          {child}
        </CSSTransition>
      ))}
    </Origin>
  );
};

Transition.defaultProps = {
  type: 'custom',
};

export default Transition;
