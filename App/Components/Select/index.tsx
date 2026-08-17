import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { Ri } from '@/Icons';

import type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--select';

type ItemMeta = { value: string; label: string };

type ContentPlacement = {
  left: number;
  maxHeight: number;
  side: 'bottom' | 'top';
  top?: number;
  bottom?: number;
  width: number;
};

type ContextValue = {
  disabled?: boolean;
  listId: string;
  onValueChange: (value: string, label: string) => void;
  open: boolean;
  registerItem: (item: ItemMeta) => void;
  setOpen: (open: boolean) => void;
  triggerId: string;
  value?: string;
  valueLabel?: string;
};

const SelectContext = createContext<ContextValue | null>(null);

const useSelect = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error('Select parts must be used within Select');
  }
  return ctx;
};

const readGap = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--kicl-gutter-narrowest')
    .trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 4;
};

const readMaxBlockSize = (node: HTMLElement) => {
  const raw = getComputedStyle(node).maxBlockSize;
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 256;
};

/**
 * Option list control - API aligned with
 * https://ui.shadcn.com/docs/components/base/select
 */
const Select: React.FC<SelectProps> = ({
  children,
  className,
  defaultValue,
  disabled,
  onValueChange,
  value,
}) => {
  const reactId = useId();
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ItemMeta[]>([]);
  const current = isControlled ? value : uncontrolled;
  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const registerItem = useCallback((item: ItemMeta) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.value === item.value);
      if (existing?.label === item.label) {
        return prev;
      }
      if (existing) {
        return prev.map((entry) => (entry.value === item.value ? item : entry));
      }
      return [...prev, item];
    });
  }, []);

  const valueLabel = useMemo(
    () => items.find((item) => item.value === current)?.label,
    [current, items]
  );

  const setValue = useCallback(
    (next: string, label: string) => {
      if (disabled) {
        return;
      }
      if (!isControlled) {
        setUncontrolled(next);
      }
      onValueChangeRef.current?.(next);
      registerItem({ value: next, label });
      setOpen(false);
    },
    [disabled, isControlled, registerItem]
  );

  const context = useMemo<ContextValue>(
    () => ({
      disabled,
      listId: `${CLASS_NAME}-list-${reactId}`,
      onValueChange: setValue,
      open,
      registerItem,
      setOpen,
      triggerId: `${CLASS_NAME}-trigger-${reactId}`,
      value: current,
      valueLabel,
    }),
    [current, disabled, open, reactId, registerItem, setValue, valueLabel]
  );

  return (
    <SelectContext.Provider value={context}>
      <div
        data-slot='select'
        className={classNames(CLASS_NAME, 'kicl-position-relative', className)}
        data-state={open ? 'open' : 'closed'}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

Select.displayName = 'Select';

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, disabled, onKeyDown, ...rest }, ref) => {
    const select = useSelect();
    const isDisabled = disabled || select.disabled;

    return (
      <button
        ref={ref}
        type='button'
        id={select.triggerId}
        disabled={isDisabled}
        aria-haspopup='listbox'
        aria-expanded={select.open}
        aria-controls={select.listId}
        data-slot='select-trigger'
        className={classNames(
          `${CLASS_NAME}__trigger`,
          'kicl-font-size-small',
          className
        )}
        onClick={() => {
          if (!isDisabled) {
            select.setOpen(!select.open);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (
            event.key === 'ArrowDown' ||
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault();
            select.setOpen(true);
          }
          if (event.key === 'Escape') {
            select.setOpen(false);
          }
        }}
        {...rest}
      >
        {children}
        <Ri.RiArrowDownSLine className={`${CLASS_NAME}__icon`} aria-hidden />
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder = 'Select…', ...rest }, ref) => {
    const select = useSelect();
    const empty = !select.valueLabel;

    return (
      <span
        ref={ref}
        data-slot='select-value'
        className={classNames(
          `${CLASS_NAME}__value`,
          { [`${CLASS_NAME}__value--placeholder`]: empty },
          className
        )}
        {...rest}
      >
        {empty ? placeholder : select.valueLabel}
      </span>
    );
  }
);

SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, ...rest }, ref) => {
    const select = useSelect();
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const [placement, setPlacement] = useState<ContentPlacement | null>(null);

    useLayoutEffect(() => {
      if (!select.open) {
        setPlacement(null);
        return undefined;
      }

      const update = () => {
        const content = nodeRef.current;
        if (!content) {
          return;
        }

        const root = content.closest(`.${CLASS_NAME}`);
        const trigger = root?.querySelector<HTMLElement>(
          `[data-slot='select-trigger']`
        );
        if (!trigger) {
          return;
        }

        const rect = trigger.getBoundingClientRect();
        const gap = readGap();
        const maxBlock = readMaxBlockSize(content);
        const spaceBelow = window.innerHeight - rect.bottom - gap;
        const spaceAbove = rect.top - gap;
        const desired = Math.min(maxBlock, content.scrollHeight || maxBlock);
        const side: ContentPlacement['side'] =
          spaceBelow < desired && spaceAbove > spaceBelow ? 'top' : 'bottom';
        const available = side === 'bottom' ? spaceBelow : spaceAbove;

        setPlacement({
          side,
          left: rect.left,
          width: rect.width,
          maxHeight: Math.max(0, Math.min(maxBlock, available)),
          ...(side === 'bottom'
            ? { top: rect.bottom + gap, bottom: undefined }
            : { top: undefined, bottom: window.innerHeight - rect.top + gap }),
        });
      };

      update();
      window.addEventListener('resize', update);
      window.addEventListener('scroll', update, true);
      return () => {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update, true);
      };
    }, [select.open, children]);

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
        const root = node.closest(`.${CLASS_NAME}`);
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
        className={classNames(
          `${CLASS_NAME}__content`,
          'kicl-position-fixed',
          className
        )}
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

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      role='group'
      data-slot='select-group'
      className={classNames(`${CLASS_NAME}__group`, className)}
      {...rest}
    />
  )
);

SelectGroup.displayName = 'SelectGroup';

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot='select-label'
      className={classNames(
        `${CLASS_NAME}__label`,
        'kicl-font-size-smaller',
        className
      )}
      {...rest}
    />
  )
);

SelectLabel.displayName = 'SelectLabel';

const SelectSeparator = React.forwardRef<HTMLHRElement, SelectSeparatorProps>(
  ({ className, ...rest }, ref) => (
    <hr
      ref={ref}
      data-slot='select-separator'
      className={classNames(`${CLASS_NAME}__separator`, className)}
      {...rest}
    />
  )
);

SelectSeparator.displayName = 'SelectSeparator';

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ children, className, disabled, value, ...rest }, ref) => {
    const { registerItem, onValueChange, value: selectedValue } = useSelect();
    const label = typeof children === 'string' ? children : String(value);
    const selected = selectedValue === value;

    useEffect(() => {
      registerItem({ value, label });
    }, [label, registerItem, value]);

    return (
      <button
        ref={ref}
        type='button'
        role='option'
        aria-selected={selected}
        disabled={disabled}
        data-slot='select-item'
        className={classNames(
          `${CLASS_NAME}__item`,
          'kicl-font-size-small',
          className
        )}
        onClick={() => onValueChange(value, label)}
        {...rest}
      >
        <span>{children}</span>
        {selected ? (
          <Ri.RiCheckLine
            className={`${CLASS_NAME}__item-indicator`}
            aria-hidden
          />
        ) : null}
      </button>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from './Spec';

export {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

export default Select;
