import { createContext, useContext, type RefObject } from 'react';

type ContextValue = {
  anchor: RefObject<HTMLDivElement | null>;
  content: RefObject<HTMLDivElement | null>;
  close: () => void;
};

const ComboboxContext = createContext<ContextValue | null>(null);

const useCombobox = () => {
  const ctx = useContext(ComboboxContext);
  if (!ctx) {
    throw new Error('Combobox parts must be used within Combobox');
  }
  return ctx;
};

/** The focusable things in a container, in document order. */
const focusables = (node: HTMLElement | null, selector: string) =>
  node ? Array.from(node.querySelectorAll<HTMLElement>(selector)) : [];

export { ComboboxContext, focusables, useCombobox };
