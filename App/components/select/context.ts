import { createContext, useContext } from 'react';

export type ItemMeta = { value: string; label: string };

export type ContextValue = {
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

export const SelectContext = createContext<ContextValue | null>(null);

export const useSelect = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error('Select parts must be used within Select');
  }
  return ctx;
};
