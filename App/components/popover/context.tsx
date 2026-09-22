import { createContext, useContext } from 'react';

type ContextValue = {
  /** Ties the trigger to the panel, and names the anchor they position by. */
  id: string;
  anchor: string;
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

export { PopoverContext, usePopover };
