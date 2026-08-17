import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--popover';

type ContextValue = {
  /** Ties the trigger to the panel, and names the anchor they position by. */
  id: string;
  anchor: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PopoverContext = createContext<ContextValue | null>(null);

const usePopover = () => {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error('Popover parts must be used within Popover');
  }
  return ctx;
};

/**
 * Anchored overlay, built on the browser's own popover.
 *
 * The panel carries `popover` and the trigger points at it with
 * `popovertarget`, so opening, closing, dismissing on an outside click and
 * dismissing on Escape are all the platform's work. What is left here is the
 * controlled-open contract, which the platform has no opinion about: a caller
 * that wants the panel shut when something inside it is chosen - `DatePicker`
 * picking a date - still has to say so.
 *
 * The gain is not only less code. A popover lives in the top layer, so no
 * ancestor's `overflow` or stacking context can clip it, and the panel stays
 * mounted while closed, which is what lets it animate out as well as in.
 */
const Popover: React.FC<PopoverProps> = ({
  children,
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  ...rest
}) => {
  const isControlled = open !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = isControlled ? Boolean(open) : uncontrolled;

  /*
   * `useId` is unique per instance but contains characters neither an anchor
   * name nor a selector will take, so it is reduced to letters and digits.
   */
  const key = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = `${CLASS_NAME}--${key}`;
  const anchor = `--${CLASS_NAME}--${key}`;

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setUncontrolled(next);
    }

    onOpenChange?.(next);
  };

  return (
    <PopoverContext.Provider value={{ id, anchor, open: isOpen, setOpen }}>
      <div
        data-slot='popover'
        className={classNames(CLASS_NAME, className)}
        data-state={isOpen ? 'open' : 'closed'}
        /*
         * Declared on the wrapper so both the trigger and the panel inherit
         * one name. An anchor name has to be a literal in the stylesheet, and
         * a component may be on the page many times over - passing it through
         * a custom property is what keeps each pair talking only to itself.
         */
        style={{ [`--${CLASS_NAME}--anchor`]: anchor } as React.CSSProperties}
        {...rest}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

Popover.displayName = 'Popover';

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, className, onClick, ...rest }, ref) => {
    const popover = usePopover();

    return (
      <button
        ref={ref}
        type='button'
        data-slot='popover-trigger'
        aria-expanded={popover.open}
        className={classNames(`${CLASS_NAME}__trigger`, className)}
        /*
         * The browser toggles the panel from this attribute. The handler is
         * passed through untouched and no longer sets state - whatever
         * happens, the `toggle` event on the panel is what reports it back.
         */
        popoverTarget={popover.id}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      children,
      className,
      placement = 'block-end',
      variant = 'default',
      ...rest
    },
    ref
  ) => {
    const popover = usePopover();
    const nodeRef = useRef<HTMLDivElement | null>(null);

    /* The browser is the source of truth; this reports what it decided. */
    useEffect(() => {
      const node = nodeRef.current;

      if (!node) {
        return undefined;
      }

      const onToggle = (event: Event) => {
        const next = (event as ToggleEvent).newState === 'open';

        if (next !== popover.open) {
          popover.setOpen(next);
        }
      };

      node.addEventListener('toggle', onToggle);

      return () => node.removeEventListener('toggle', onToggle);
    }, [popover]);

    /*
     * And this pushes a caller's decision back the other way, for the openings
     * and closings no click caused - a date chosen inside the panel, or a
     * `defaultOpen` panel that has to be shown once on mount.
     */
    useEffect(() => {
      const node = nodeRef.current;

      if (!node) {
        return;
      }

      const shown = node.matches(':popover-open');

      if (popover.open && !shown) {
        node.showPopover();
      }

      if (!popover.open && shown) {
        node.hidePopover();
      }
    }, [popover.open]);

    return (
      <div
        ref={(node) => {
          nodeRef.current = node;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        id={popover.id}
        popover='auto'
        role='dialog'
        data-slot='popover-content'
        className={classNames(
          `${CLASS_NAME}__content`,
          `${CLASS_NAME}__content--${placement}`,
          `${CLASS_NAME}__content--variant--${variant}`,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

export type {
  PopoverContentProps,
  PopoverPlacement,
  PopoverProps,
  PopoverTriggerProps,
  PopoverVariant,
} from './Spec';

export { PopoverContent, PopoverTrigger };
export default Popover;
