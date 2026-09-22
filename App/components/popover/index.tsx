import React, { useId, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { PopoverProps } from './spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Context
import { PopoverContext } from './context';

// Partials
import { PopoverContent } from './content';
import { PopoverTrigger } from './trigger';

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

export type {
  PopoverContentProps,
  PopoverPlacement,
  PopoverProps,
  PopoverTriggerProps,
  PopoverVariant,
} from './spec';

export { PopoverContent, PopoverTrigger, Popover };
