import React, { useEffect, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card } from '@/components/card';

// Spec
import type { SheetProps } from './spec';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--components--sheet';

/**
 * A panel at the side of the page, over what's behind it but not in its way:
 * the page stays usable while it's open, and a click on the page leaves it
 * open. It slides in from the end, and on small screens it fills the screen.
 *
 * It's a `Card` in the top layer as a manual popover, so only buttons that
 * point at it with `popovertarget` open and close it. It scrolls as a whole;
 * a `SheetHeader` or `SheetFooter` inside it stays stuck to its top or
 * bottom, with a line of the moving gradient while content runs under it.
 */
const Sheet = React.forwardRef<HTMLElement, SheetProps>(
  (
    {
      children,
      className,
      defaultOpen = false,
      onOpenChange,
      size = 4,
      style,
      ...rest
    },
    ref
  ) => {
    const node = useRef<HTMLElement | null>(null);
    // Only the open state it mounts with counts; after that its buttons lead.
    const opening = useRef(defaultOpen);
    const report = useRef(onOpenChange);

    useEffect(() => {
      report.current = onOpenChange;
    }, [onOpenChange]);

    useEffect(() => {
      const element = node.current;

      if (!element) {
        return;
      }

      if (opening.current && !element.matches(':popover-open')) {
        element.showPopover();
      }

      const toggle = (event: Event) =>
        report.current?.((event as ToggleEvent).newState === 'open');

      element.addEventListener('toggle', toggle);

      return () => element.removeEventListener('toggle', toggle);
    }, []);

    return (
      <Card
        {...rest}
        // Fixed chrome, so a frame on the page moves its insets inside the frame's edge.
        className={classNames(CLASS_NAME, 'kicl-position-fixed', className)}
        is='aside'
        popover='manual'
        ref={(element) => {
          node.current = element;

          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
        }}
        style={
          {
            [`--${CLASS_NAME}--inline-size`]: `var(--kicl-columns-${size})`,
            ...style,
          } as React.CSSProperties
        }
      >
        {children}
      </Card>
    );
  }
);

Sheet.displayName = 'Sheet';

export type { SheetProps } from './spec';
export { SheetFooter } from './footer';
export { SheetHeader } from './header';
export { Sheet };
