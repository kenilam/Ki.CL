import React, { useCallback, useId, useMemo, useRef, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Context
import { type ContextValue, type ItemMeta, SelectContext } from './context';

import type { SelectProps } from './spec';

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

export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from './spec';

export { SelectContent } from './content';
export { SelectGroup } from './group';
export { SelectItem } from './item';
export { SelectLabel } from './label';
export { SelectSeparator } from './separator';
export { SelectTrigger } from './trigger';
export { SelectValue } from './value';
export { Select };
