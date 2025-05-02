import React, {
  ComponentPropsWithRef,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
  ElementType,
} from 'react';
import ReactDOM from 'react-dom';

// Libraries
import _classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import { v4 as uuid } from 'uuid';

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

const Animation: React.FunctionComponent<Spec.Props> = ({
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
  onEntered: enteredHandler,
  onExited: exitedHandler,
  unmountOnExit = true,
  ...rest
}) => {
  const nodeRef = useRef<HTMLDivElement | undefined>(null);

  const [identifier, setIdentifier] = useState(uuid());

  useEffect(() => {
    setIdentifier(uuid());
  }, []);

  const style = `${CLASS_NAME}--style--${animationStyle}`;

  const uniqueID = `${CLASS_NAME}--${identifier}`;

  const classNames = _classNames(
    className,
    CLASS_NAME,
    uniqueID,
    style,
    {
      [`${CLASS_NAME}--transition-duration-${animationDuration}`]:
        animationDuration,
    },
    `${CLASS_NAME}-`
  );

  const onEntered: EnterHandler<undefined> = (isAppearing) => {
    nodeRef.current?.classList.remove(
      `${CLASS_NAME}--appear-done`,
      `${CLASS_NAME}--enter-done`
    );

    enteredHandler?.(isAppearing);
  };

  const onExited: ExitHandler<undefined> = (node) => {
    exitedHandler?.(node);
  };

  const Style = ReactDOM.createPortal(
    <style data-component-animation-uuid={uniqueID}>
      {`
        :root {
          .${uniqueID} {
            --${CLASS_NAME}--transition-delay: ${animationDelay}ms;
            --${CLASS_NAME}--transition-duration: var(--kicl-transition-duration-${animationDuration});
            --${CLASS_NAME}--transition-timing-function: var(--kicl-${animationEasing});
          }
        }
      `}
    </style>,
    window.document.body
  );

  return (
    <>
      {Style}
      <CSSTransition
        {...rest}
        addEndListener={addEndListener(
          nodeRef as React.RefObject<HTMLDivElement | null>
        )}
        appear={appear}
        classNames={classNames}
        in={transitionIn}
        key={animationKey || rest.key}
        mountOnEnter={mountOnEnter}
        nodeRef={nodeRef}
        onEntered={onEntered}
        onExited={onExited}
        unmountOnExit={unmountOnExit}
      >
        <>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
              return child;
            }

            return React.cloneElement(child, {
              ...(child.props as PropsWithChildren),
              ref: nodeRef,
            } as ComponentPropsWithRef<ElementType<HTMLElement>>);
          })}
        </>
      </CSSTransition>
    </>
  );
};

type AnimationProps<Ref extends HTMLElement | undefined = undefined> =
  Spec.Props<Ref>;

export {
  type AnimationProps,
  ANIMATION_STYLES,
  AnimationGroup,
  addEndListener,
};
export default Animation;
