import React, { useEffect } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { ComboboxAnchorProps } from '@/components/combobox/spec';

// Constants
import {
  CLASS_NAME as COMBOBOX,
  FOCUSABLE,
} from '@/components/combobox/constants';

// Context
import { focusables, useCombobox } from '@/components/combobox/context';
import { usePopover } from '@/components/popover/context';

const CLASS_NAME = `${COMBOBOX}__anchor`;

/**
 * Wraps the field the list belongs to. ArrowDown moves into the list while it
 * is showing; Escape closes it.
 */
const ComboboxAnchor: React.FC<ComboboxAnchorProps> = ({
  children,
  className,
  ...rest
}) => {
  const combobox = useCombobox();
  const popover = usePopover();
  const { open } = popover;

  /*
   * A native listener, because the wrapper is a plain box around the field and
   * the keys belong to the field. Adding a role just to attach a handler would
   * give the wrapper a meaning it doesn't have.
   */
  useEffect(() => {
    const node = combobox.anchor.current;
    if (!node || !open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }
      if (event.key === 'ArrowDown') {
        const [first] = focusables(combobox.content.current, FOCUSABLE);
        if (first) {
          event.preventDefault();
          first.focus();
        }
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        combobox.close();
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, [combobox, open]);

  return (
    <div
      {...rest}
      className={classNames(CLASS_NAME, className)}
      data-slot='combobox-anchor'
      ref={combobox.anchor}
    >
      {children}
    </div>
  );
};

ComboboxAnchor.displayName = 'ComboboxAnchor';

export { ComboboxAnchor };
