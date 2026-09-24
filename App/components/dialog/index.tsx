import React, { useEffect, useId, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from '@/components';

// Spec
import * as Spec from './spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Context
import { DialogContext } from './context';

// Partials
import { Close } from './close';

/**
 * A `<dialog>`, and as little around it as the platform allows.
 *
 * What used to live here in JavaScript - a state mirroring `open`, four nested
 * animation wrappers, `inert` toggled by hand during the enter, a `close()`
 * deferred until the exit finished, Escape re-implemented on `keyup`, and a
 * button standing in for a backdrop - is now the element's own behaviour and a
 * transition in the stylesheet.
 *
 * The one thing the platform has no opinion about is that `open` is a prop
 * rather than an attribute: React would set `open` directly, which shows the
 * dialog without giving it the top layer, focus trapping or an inert
 * background. So the prop is applied through `showModal()` instead, and the
 * attribute is never rendered.
 */
const Dialog = React.forwardRef<HTMLDialogElement, Spec.Props>(
  (
    {
      children,
      className,
      closable = true,
      closeIcon: CloseIcon,
      dense = false,
      footer,
      fullScreen = false,
      open = false,
      title,
      ...rest
    },
    ref
  ) => {
    const generated = useId();
    const id = rest.id ?? generated;
    const titleId = `${id}--title`;
    const isLabelled = Boolean(rest['aria-label'] || rest['aria-labelledby']);

    const node = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      const dialog = node.current;

      if (!dialog) {
        return;
      }

      if (open && !dialog.open) {
        dialog.showModal();
      }

      if (!open && dialog.open) {
        dialog.close();
      }
    }, [open]);

    const setRef = (dialog: HTMLDialogElement | null) => {
      node.current = dialog;

      if (typeof ref === 'function') {
        ref(dialog);
        return;
      }

      if (ref) {
        (ref as React.MutableRefObject<HTMLDialogElement | null>).current =
          dialog;
      }
    };

    return (
      <DialogContext.Provider
        value={{ closable, closeIcon: CloseIcon, fullScreen, id }}
      >
        <dialog
          aria-labelledby={title && !isLabelled ? titleId : undefined}
          {...rest}
          id={id}
          ref={setRef}
          className={classNames(
            CLASS_NAME,
            {
              [`${CLASS_NAME}--is-closable`]: closable,
              [`${CLASS_NAME}--is-dense`]: dense,
              [`${CLASS_NAME}--is-full-screen`]: fullScreen,
            },
            className
          )}
          closedby={
            closable === true || closable === 'keyboard' ? 'any' : 'none'
          }
        >
          <Layout>
            <div>
              <Layout autoFlow='column' alignItems='baseline'>
                <header>
                  {title ? (
                    <Heading id={titleId} is='h2' lookLike='h4' dense>
                      {title}
                    </Heading>
                  ) : null}
                  <Close />
                </header>
              </Layout>

              {children}

              {footer ? (
                <footer className={`${CLASS_NAME}--footer`}>{footer}</footer>
              ) : null}
            </div>
          </Layout>
        </dialog>
      </DialogContext.Provider>
    );
  }
);

type DialogProps = Spec.Props;

Dialog.displayName = 'Dialog';

export { Dialog, type DialogProps };
