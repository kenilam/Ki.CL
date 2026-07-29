import React, {
  createContext,
  useContext,
  useEffect,
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
 * Anchored overlay — used by DatePicker (shadcn composition).
 * https://ui.shadcn.com/docs/components/base/date-picker
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

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setUncontrolled(next);
    }
    onOpenChange?.(next);
  };

  return (
    <PopoverContext.Provider value={{ open: isOpen, setOpen }}>
      <div
        data-slot='popover'
        className={classNames(CLASS_NAME, 'kicl-position-relative', className)}
        data-state={isOpen ? 'open' : 'closed'}
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
        className={className}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            popover.setOpen(!popover.open);
          }
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, ...rest }, ref) => {
    const popover = usePopover();
    const nodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!popover.open) {
        return undefined;
      }

      const onPointerDown = (event: PointerEvent) => {
        const root = nodeRef.current?.closest(`.${CLASS_NAME}`);
        if (root && !root.contains(event.target as Node)) {
          popover.setOpen(false);
        }
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          popover.setOpen(false);
        }
      };

      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('pointerdown', onPointerDown);
        document.removeEventListener('keydown', onKeyDown);
      };
    }, [popover]);

    if (!popover.open) {
      return null;
    }

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
        role='dialog'
        data-slot='popover-content'
        className={classNames(
          `${CLASS_NAME}__content`,
          'kicl-position-absolute',
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
  PopoverProps,
  PopoverTriggerProps,
} from './Spec';

export { PopoverContent, PopoverTrigger };
export default Popover;
