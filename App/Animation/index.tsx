import React, { PropsWithChildren } from 'react';

// Libraries
import _classNames from 'classnames';
import { CSSUnit } from '@/Helper';
import { CSSTransition } from 'react-transition-group';
import {
  EndHandler,
  EnterHandler,
  ExitHandler,
} from 'react-transition-group/Transition';

// Components
import AnimationGroup from './AnimationGroup';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';
import './Styles.blur.scss';
import './Styles.fade.scss';
import './Styles.slide-down.scss';
import './Styles.zoom-in.scss';
import './Styles.zoom-out.scss';

const CLASS_NAME = 'kicl--animation';

const ANIMATION_STYLES: Spec.AnimationStyles = {
  blur: 'blur',
  fade: 'fade',
  'slide-down': 'slide-down',
  'zoom-in': 'zoom-in',
  'zoom-out': 'zoom-out',
};

const Animation: React.FunctionComponent<PropsWithChildren & Spec.Props> = ({
  animationKey,
  animationStyle = ANIMATION_STYLES.fade,
  appear = true,
  children,
  className,
  mountOnEnter = true,
  onEntered: enteredHandler,
  onExited: exitedHandler,
  unmountOnExit = true,
  ...rest
}) => {
  const animationClassName = `${CLASS_NAME}--style--${animationStyle}`;

  const classNames = _classNames(
    className,
    CLASS_NAME,
    animationClassName,
    `${CLASS_NAME}-`
  );

  const addEndListener: EndHandler<undefined> = (node, done) => {
    const transitionDuration = CSSUnit({
      values: window.getComputedStyle(node).transitionDuration,
    });
    const transitionDelay = CSSUnit({
      values: window.getComputedStyle(node).transitionDelay,
    });

    const wait = transitionDuration + transitionDelay;

    window.setTimeout(done, wait);
  };

  const onEntered: EnterHandler<undefined> = (node, isAppearing) => {
    let classList = `${classNames}-enter ${CLASS_NAME}--enter-done`;

    if (isAppearing) {
      classList = `${classList} ${CLASS_NAME}--appear-done`;
    }

    node?.classList.remove(...classList.split(' '));

    enteredHandler?.(node, isAppearing);
  };

  const onExited: ExitHandler<undefined> = (node) => {
    node?.classList.remove(
      ...`${classNames}-enter ${CLASS_NAME}--exit-done`.split(' ')
    );

    exitedHandler?.(node);
  };

  return (
    <CSSTransition
      {...rest}
      addEndListener={addEndListener}
      appear={appear}
      classNames={classNames}
      key={animationKey}
      mountOnEnter={mountOnEnter}
      onEntered={onEntered}
      onExited={onExited}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </CSSTransition>
  );
};

type AnimationProps = Spec.Props;

export { type AnimationProps, ANIMATION_STYLES, AnimationGroup };
export default Animation;
