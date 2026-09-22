import React, { useEffect, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { PopoverContentProps } from '@/components/popover/spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as POPOVER } from '@/components/popover/constants';

// Context
import { usePopover } from '@/components/popover/context';

const CLASS_NAME = `${POPOVER}__content`;

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
    const isLabelled = Boolean(rest['aria-label'] || rest['aria-labelledby']);
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
        /* Named by its trigger unless the caller gives it a name. */
        aria-labelledby={isLabelled ? undefined : `${popover.id}__trigger`}
        data-slot='popover-content'
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--${placement}`,
          `${CLASS_NAME}--variant--${variant}`,
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

export { PopoverContent };
