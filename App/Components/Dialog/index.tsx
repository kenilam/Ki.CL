import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button } from '@/Components';

// Icons
import * as Icons from '@/Icons';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--components--dialog';

/**
 * A `<dialog>`, and as little around it as the platform allows.
 *
 * What used to live here in JavaScript — a state mirroring `open`, four nested
 * animation wrappers, `inert` toggled by hand during the enter, a `close()`
 * deferred until the exit finished, Escape re-implemented on `keyup`, and a
 * button standing in for a backdrop — is now the element's own behaviour and a
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
      ...rest
    },
    ref
  ) => {
    const generated = useId();
    const id = rest.id ?? generated;

    return (
      <dialog
        {...rest}
        id={id}
        ref={ref}
        className={classNames(
          CLASS_NAME,
          {
            [`${CLASS_NAME}--is-closable`]: closable,
            [`${CLASS_NAME}--is-dense`]: dense,
            [`${CLASS_NAME}--is-full-screen`]: fullScreen,
          },
          className
        )}
        closedby={closable ? 'any' : 'none'}
      >
        <section>
          {closable ? (
            <Button
              unstyled
              className={classNames(
                'kicl-font-size-medium',
                `${CLASS_NAME}--close`
              )}
              aria-label='Close this dialog'
              command='request-close'
              commandFor={id}
            >
              {CloseIcon ? <CloseIcon /> : <Icons.Ri.RiCloseLine />}
            </Button>
          ) : null}
          {children}
        </section>

        {footer ? (
          <footer className={`${CLASS_NAME}--footer`}>{footer}</footer>
        ) : null}
      </dialog>
    );
  }
);

type DialogProps = Spec.Props;

Dialog.displayName = 'Dialog';

export { type DialogProps };
export default Dialog;
