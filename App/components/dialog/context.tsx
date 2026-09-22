import { createContext, useContext } from 'react';

// Icons
import { IconType } from '@/icons';

type ContextValue = {
  closable?: boolean | 'keyboard';
  closeIcon?: IconType;
  fullScreen?: boolean;
  /** The dialog's id, which the close button targets with `commandFor`. */
  id: string;
};

const DialogContext = createContext<ContextValue | null>(null);

const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('Dialog parts must be used within Dialog');
  }
  return ctx;
};

export { DialogContext, useDialog };
