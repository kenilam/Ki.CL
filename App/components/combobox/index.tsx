import React, { useCallback, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Popover } from '@/components/popover';

// Spec
import type { ComboboxProps } from './spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Context
import { ComboboxContext } from './context';

// Partials
import { ComboboxAnchor } from './anchor';
import { ComboboxContent } from './content';

/**
 * A field with a list of suggestions under it - API after
 * https://ui.shadcn.com/docs/components/combobox, for any field, a textarea
 * included, which a native `<datalist>` cannot serve.
 *
 * Built on `Popover`, so placement, flipping and the transition are the
 * popover's. The differences: the panel is placed against the field rather
 * than a button, it is a `manual` popover so typing in the field does not
 * dismiss it, and the arrow keys move from the field into the list and back.
 */
const Combobox: React.FC<ComboboxProps> = ({
  children,
  className,
  onBlur,
  onOpenChange,
  open,
  ...rest
}) => {
  const anchor = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  return (
    <ComboboxContext.Provider value={{ anchor, content, close }}>
      <Popover
        {...rest}
        className={classNames(CLASS_NAME, className)}
        data-slot='combobox'
        onBlur={(event) => {
          onBlur?.(event);
          // Focus moved somewhere other than the field or the list.
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            close();
          }
        }}
        onOpenChange={onOpenChange}
        open={open}
      >
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
};

Combobox.displayName = 'Combobox';

export type {
  ComboboxAnchorProps,
  ComboboxContentProps,
  ComboboxProps,
} from './spec';

export { Combobox, ComboboxAnchor, ComboboxContent };
