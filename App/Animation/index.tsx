import React, { PropsWithChildren } from 'react';

// Libraries
import _classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

// Components
import AnimationGroup from './AnimationGroup';

// Helpers
import { addEndListener } from './Helpers';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';
import './Styles.blur.scss';
import './Styles.fade.scss';
import './Styles.slide-from-top.scss';
import './Styles.slide-from-left.scss';
import './Styles.slide-from-right.scss';
import './Styles.slide-from-bottom.scss';
import './Styles.zoom-in.scss';
import './Styles.zoom-out.scss';

const CLASS_NAME = 'kicl--animation';

const ANIMATION_STYLES: Spec.AnimationStyles = {
  blur: 'blur',
  fade: 'fade',
  'slide-from-bottom': 'slide-from-bottom',
  'slide-from-left': 'slide-from-left',
  'slide-from-right': 'slide-from-right',
  'slide-from-top': 'slide-from-top',
  'zoom-in': 'zoom-in',
  'zoom-out': 'zoom-out',
};

const Animation: React.FunctionComponent<PropsWithChildren & Spec.Props> = ({
  animationKey,
  animationStyle = ANIMATION_STYLES.fade,
  appear = true,
  children,
  className,
  in: transitionIn = true,
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
      in={transitionIn}
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

export {
  type AnimationProps,
  ANIMATION_STYLES,
  AnimationGroup,
  addEndListener,
};
export default Animation;
