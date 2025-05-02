import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Animation,
  AnimationProps,
  Button,
  ButtonProps,
  Layout,
} from '@/Components';

// Icons
import * as Icons from '@/Icons';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';
import './Styles.animation.scss';

const CLASS_NAME = 'kicl--components--slide-out';

const SlideOut = React.forwardRef<HTMLDialogElement, Spec.Props>(
  (
    {
      animationStyle = 'slide-from-right',
      closeIcon: CloseIcon,
      children,
      island = false,
      open = true,

      alignContent = 'start',
      alignItems = 'start',
      autoFlow,
      display,
      frames,
      fullScreen,
      gap,
      justifyContent = 'start',
      justifyItems = 'start',
      wrap,

      onCancel: cancelHandler,
      onEnter: onEnterHandler,
      onEntered: onEnteredHandler,
      onEntering: onEnteringHandler,
      onExit: onExitHandler,
      onExited: onExitedHandler,
      onExiting: onExitingHandler,

      onKeyDown: keyDownHandler,
      onKeyUp: keyUpHandler,
      ...rest
    },
    ref
  ) => {
    const [transitionIn, setTransitionIn] = useState(open);

    useEffect(() => {
      if (transitionIn === open) {
        return;
      }

      setTransitionIn(open);
    }, [open]);

    const onEnter: Spec.Props['onEnter'] = (node, isAppear) => {
      if (!node) {
        return;
      }

      if (!node?.open) {
        node?.showModal();

        node.inert = true;

        return;
      }

      onEnterHandler?.(node, isAppear);
    };

    const onEntered: Spec.Props['onEntered'] = (node, isAppear) => {
      if (!node) {
        return;
      }

      node.inert = false;

      onEnteredHandler?.(node, isAppear);
    };

    const onExited: Spec.Props['onExited'] = (node) => {
      node?.close();

      onExitedHandler?.(node);
    };

    const onCancel: Spec.Props['onCancel'] = (event) => {
      event.preventDefault();

      setTransitionIn(false);

      cancelHandler?.(event);
    };

    const onClose: ButtonProps['onClick'] = (event) => {
      event.preventDefault();

      setTransitionIn(false);
    };

    const onKeyDown: Spec.Props['onKeyDown'] = (event) => {
      if (event.target !== event.currentTarget) {
        keyUpHandler?.(event);

        return;
      }

      event.preventDefault();

      keyDownHandler?.(event);
    };

    const onKeyUp: Spec.Props['onKeyUp'] = (event) => {
      if (event.target !== event.currentTarget) {
        keyUpHandler?.(event);

        return;
      }

      event.preventDefault();

      if (event.key === 'Escape') {
        setTransitionIn(false);
      }

      keyUpHandler?.(event);
    };

    const Close = (
      <Button
        className={classNames('kicl-font-size-medium', `${CLASS_NAME}--close`)}
        onClick={onClose}
        unstyled
      >
        {CloseIcon ? <CloseIcon /> : <Icons.Ri.RiCloseLine />}
      </Button>
    );

    const Content = (
      <Layout
        alignContent={alignContent}
        alignItems={alignItems}
        autoFlow={autoFlow}
        display={display}
        frames={frames}
        fullScreen={fullScreen}
        gap={gap}
        justifyContent={justifyContent}
        justifyItems={justifyItems}
        wrap={wrap}
      >
        <section>{children}</section>
      </Layout>
    );

    const className = classNames(
      CLASS_NAME,
      {
        [`${CLASS_NAME}--is-island`]: island,
      },
      rest.className
    );

    const animationDuration: AnimationProps['animationDuration'] = transitionIn
      ? 'fast'
      : 'faster';

    return (
      <Animation
        animationDuration={animationDuration}
        animationStyle={animationStyle}
        in={transitionIn}
        onEnter={onEnter}
        onEntered={onEntered}
        onEntering={onEnteringHandler}
        onExit={onExitHandler}
        onExited={onExited}
        onExiting={onExitingHandler}
      >
        <dialog
          {...rest}
          className={className}
          data-animation-style={animationStyle}
          onCancel={onCancel}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          ref={ref}
        >
          {Close}
          {Content}
        </dialog>
      </Animation>
    );
  }
);

type SlideOutProps = Spec.Props;

SlideOut.displayName = 'SlideOut';

export { type SlideOutProps };
export default SlideOut;
