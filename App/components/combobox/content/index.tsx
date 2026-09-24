import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { PopoverContent } from '@/components/popover';

// Spec
import type { ComboboxContentProps } from '@/components/combobox/spec';

// Constants
import {
  CLASS_NAME as COMBOBOX,
  FOCUSABLE,
} from '@/components/combobox/constants';

// Context
import { focusables, useCombobox } from '@/components/combobox/context';

const CLASS_NAME = `${COMBOBOX}__content`;

/** The field the anchor wraps, for handing focus back to. */
const FIELD = 'input, textarea, [contenteditable="true"]';

/**
 * The list under the field. The arrow keys move between its links and
 * buttons; up from the first, or Escape, goes back to the field.
 */
const ComboboxContent: React.FC<ComboboxContentProps> = ({
  children,
  className,
  onKeyDown,
  ...rest
}) => {
  const combobox = useCombobox();

  const toField = () =>
    combobox.anchor.current?.querySelector<HTMLElement>(FIELD)?.focus();

  return (
    <PopoverContent
      {...rest}
      className={classNames(CLASS_NAME, className)}
      data-slot='combobox-content'
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) {
          return;
        }

        const items = focusables(combobox.content.current, FOCUSABLE);
        const at = items.indexOf(document.activeElement as HTMLElement);

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          items[Math.min(at + 1, items.length - 1)]?.focus();
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (at <= 0) {
            toField();
          } else {
            items[at - 1]?.focus();
          }
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          combobox.close();
          toField();
        }
      }}
      /*
       * `manual`, because an `auto` popover closes on any click outside it, and
       * the field is outside it. It's a named group, not a dialog, because it's
       * a list of links next to the field.
       */
      popover='manual'
      ref={combobox.content}
      role='group'
    >
      {children}
    </PopoverContent>
  );
};

ComboboxContent.displayName = 'ComboboxContent';

export { ComboboxContent };
