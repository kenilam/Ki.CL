import React, { useEffect, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

// Context
import { useSelect } from '@/components/select/context';

// Hooks
import { usePlacement } from './placement';

import type { SelectContentProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__content`;

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, ...rest }, ref) => {
    const select = useSelect();
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const placement = usePlacement(nodeRef, select.open, children);

    useEffect(() => {
      if (!select.open) {
        return undefined;
      }

      const onPointerDown = (event: PointerEvent) => {
        const node = nodeRef.current;
        const target = event.target as Node | null;
        if (!node || !target) {
          return;
        }
        const root = node.closest(`.${SELECT}`);
        if (root && !root.contains(target)) {
          select.setOpen(false);
        }
      };

      document.addEventListener('pointerdown', onPointerDown);
      return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [select]);

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
        id={select.listId}
        role='listbox'
        hidden={!select.open}
        data-slot='select-content'
        data-side={placement?.side}
        className={classNames(CLASS_NAME, 'kicl-position-fixed', className)}
        {...rest}
        style={{
          ...rest.style,
          ...(placement
            ? {
                insetInlineStart: placement.left,
                inlineSize: placement.width,
                maxBlockSize: placement.maxHeight,
                insetBlockStart:
                  placement.side === 'bottom' ? placement.top : 'auto',
                insetBlockEnd:
                  placement.side === 'top' ? placement.bottom : 'auto',
              }
            : null),
        }}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = 'SelectContent';

export { SelectContent };
