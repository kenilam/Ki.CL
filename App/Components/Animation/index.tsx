import React, { useRef, useMemo, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

// Libraries
import classNames from 'classnames';
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

const CLASS_NAME = 'kicl--components--animation';

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

const assignRef = <T,>(ref: React.Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref && 'current' in ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
};

const Animation: FunctionComponent<Spec.Props> = ({
  animationDelay = 0,
  animationDuration = 'slowest',
  animationEasing = 'ease-quint-in-out',
  animationKey,
  animationStyle = ANIMATION_STYLES.fade,
  appear = true,
  children,
  className,
  in: transitionIn = true,
  mountOnEnter = true,
  nodeRef: nodeRefProp,
  onEnter: enterHandler,
  onEntered: enteredHandler,
  onEntering,
  onExit: exitHandler,
  onExited: exitedHandler,
  onExiting,
  unmountOnExit = true,
  /*
   * Everything left over is forwarded to the child element, so the transition
   * callbacks have to be named above even though they are only passed straight
   * through. Left in here they reach the DOM, which rejects them —
   * "Unknown event handler property onEntering" on every mount.
   */
  ...rest
}) => {
  const fallbackRef = useRef<HTMLElement>(null);
  const nodeRef =
    (nodeRefProp as React.RefObject<HTMLElement | null> | undefined) ??
    fallbackRef;

  const identifier = useMemo(() => crypto.randomUUID(), []);
  const uniqueID = `${CLASS_NAME}--${identifier}`;

  const duration = `${CLASS_NAME}--duration--${animationDuration}`;
  const style = `${CLASS_NAME}--style--${animationStyle}`;

  const onEnter: EnterHandler<HTMLElement> = (isAppearing) => {
    nodeRef.current?.classList.add(CLASS_NAME, duration, style, uniqueID);

    enterHandler?.(isAppearing);
  };

  const onEntered: EnterHandler<HTMLElement> = (isAppearing) => {
    nodeRef.current?.classList.remove(
      CLASS_NAME,
      `${CLASS_NAME}--appear-active`,
      `${CLASS_NAME}--appear-done`,
      `${CLASS_NAME}--enter-active`,
      `${CLASS_NAME}--enter-done`,
      duration,
      style,
      uniqueID
    );

    enteredHandler?.(isAppearing);
  };

  const onExit: ExitHandler<HTMLElement> = () => {
    nodeRef.current?.classList.add(CLASS_NAME, duration, style, uniqueID);

    exitHandler?.();
  };

  const onExited: ExitHandler<HTMLElement> = () => {
    exitedHandler?.();
  };

  const Style = ReactDOM.createPortal(
    <style data-component-animation-uuid={uniqueID}>
      {`
        .${uniqueID} {
          --${CLASS_NAME}--transition-delay: ${animationDelay}ms;
          --${CLASS_NAME}--transition-duration: var(--kicl-transition-duration-${animationDuration});
          --${CLASS_NAME}--transition-timing-function: var(--kicl-${animationEasing});
        }
      `}
    </style>,
    window.document.body
  );

  const child = React.Children.only(children);
  const childRef = React.isValidElement(child)
    ? (child.props as { ref?: React.Ref<HTMLElement> }).ref
    : undefined;

  return (
    <>
      {Style}
      <CSSTransition<HTMLElement>
        {...rest}
        addEndListener={addEndListener(
          nodeRef as React.RefObject<HTMLElement | null>
        )}
        appear={appear}
        classNames={`${CLASS_NAME}-`}
        in={transitionIn}
        key={animationKey}
        mountOnEnter={mountOnEnter}
        nodeRef={nodeRef}
        onEnter={onEnter}
        onEntered={onEntered}
        onEntering={onEntering}
        onExit={onExit}
        onExited={onExited}
        onExiting={onExiting}
        unmountOnExit={unmountOnExit}
      >
        {React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<Spec.Props>, {
              ...rest,
              className: classNames(
                (child.props as { className?: string }).className,
                className
              ),
              ref: (element: HTMLElement | null) => {
                (
                  nodeRef as React.MutableRefObject<HTMLElement | null>
                ).current = element;
                assignRef(childRef, element);
              },
            })
          : child}
      </CSSTransition>
    </>
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
