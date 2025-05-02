import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

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

const CLASS_NAME = 'kicl--components--dialog';

const Dialog = React.forwardRef<HTMLDialogElement, Spec.Props>(
  (
    {
      children,
      className: _className,
      closeIcon: CloseIcon,
      isClosable = true,
      dense = false,
      isFullScreen = false,
      isModal = true,
      open = true,
      onEnter: onEnterHandler,
      onEntered: onEnteredHandler,
      onEntering: onEnteringHandler,
      onExit: onExitHandler,
      onExited: onExitedHandler,
      onExiting: onExitingHandler,

      onKeyDown: keyDownHandler,
      onKeyUp: keyUpHandler,

      // Layout Props
      alignContent = 'start',
      alignItems = 'start',
      autoFlow,
      footer,
      frames,
      fullScreen,
      gap = 'wide',
      justifyContent,
      justifyItems = 'start',
      wrap,
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

    const id = uuid();

    const uniqueClass = `${CLASS_NAME}--${id}`;

    const className = classNames(
      CLASS_NAME,
      {
        [`${CLASS_NAME}--is-closable`]: isClosable,
        [`${CLASS_NAME}--is-dense`]: dense,
        [`${CLASS_NAME}--is-full-screen`]: isFullScreen,
        [`${CLASS_NAME}--is-modal`]: isModal,
      },
      _className,
      uniqueClass
    );

    const onEnter: AnimationProps['onEnter'] = (node, isAppear) => {
      if (!node) {
        return;
      }

      if (!node?.open) {
        if (isModal) {
          node?.showModal();
        } else {
          node?.show();
        }

        node.inert = true;

        return;
      }

      onEnterHandler?.(node, isAppear);
    };

    const onEntered: AnimationProps['onEntered'] = (node, isAppear) => {
      if (!node) {
        return;
      }

      node.inert = false;

      onEnteredHandler?.(node, isAppear);
    };

    const onExited: AnimationProps['onExited'] = (node) => {
      node?.close();

      onExitedHandler?.(node);
    };

    const onCancel: Spec.Props['onCancel'] = (event) => {
      event.preventDefault();

      if (!isClosable) {
        return;
      }

      setTransitionIn(false);
    };

    const onClose: ButtonProps['onClick'] = (event) => {
      event.preventDefault();

      if (!isClosable) {
        return;
      }

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

      if (isClosable && event.key === 'Escape') {
        setTransitionIn(false);
      }

      keyUpHandler?.(event);
    };

    const animationDelay = isModal ? 300 : 0;

    const Close = (
      <Animation animationDelay={animationDelay} in={isClosable}>
        <Button
          className={classNames(
            'kicl-font-size-medium',
            `${CLASS_NAME}--close`
          )}
          onClick={onClose}
          unstyled
        >
          {CloseIcon ? <CloseIcon /> : <Icons.Ri.RiCloseLine />}
        </Button>
      </Animation>
    );

    const Footer = (
      <Animation animationDelay={animationDelay} in={!!footer}>
        <Layout
          alignContent='center'
          alignItems='center'
          justifyContent='center'
          justifyItems='center'
        >
          <footer className={classNames(`${CLASS_NAME}--footer`)}>
            {footer}
          </footer>
        </Layout>
      </Animation>
    );

    const animationDuration: AnimationProps['animationDuration'] = transitionIn
      ? 'fast'
      : 'faster';
    const animationEasing: AnimationProps['animationEasing'] =
      'ease-quint-in-out';
    const animationStyle: AnimationProps['animationStyle'] =
      'slide-from-bottom';

    const Section = (
      <Animation
        animationDelay={transitionIn ? animationDelay * 2 : 0}
        animationDuration={animationDuration}
        animationEasing={animationEasing}
        animationStyle={animationStyle}
        in={transitionIn}
      >
        <Layout
          alignContent={alignContent}
          alignItems={alignItems}
          autoFlow={autoFlow}
          frames={frames}
          fullScreen={fullScreen}
          gap={gap}
          justifyContent={justifyContent}
          justifyItems={justifyItems}
          wrap={wrap}
        >
          <section>
            {children}
            {Footer}
          </section>
        </Layout>
      </Animation>
    );

    let Contents = (
      <Animation
        animationDelay={!transitionIn ? animationDelay * 2 : 0}
        animationDuration={animationDuration}
        animationEasing={animationEasing}
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
          onCancel={onCancel}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          ref={ref}
          role='presentation'
        >
          {Close}
          {Section}
        </dialog>
      </Animation>
    );

    if (!isModal) {
      const onClick = () => {
        setTransitionIn(false);
      };

      Contents = (
        <Animation in={transitionIn}>
          <div className={`${CLASS_NAME}--modal-wrapper`}>
            <Button unstyled onClick={onClick}>
              Close the dialog
            </Button>
            {Contents}
          </div>
        </Animation>
      );
    }

    return Contents;
  }
);

type DialogProps = Spec.Props;

Dialog.displayName = 'Dialog';

export { type DialogProps };
export default Dialog;
