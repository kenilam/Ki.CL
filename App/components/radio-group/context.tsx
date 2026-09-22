import { createContext, useContext } from 'react';

type ContextValue = {
  disabled?: boolean;
  name: string;
  onValueChange: (value: string) => void;
  value?: string;
};

const RadioGroupContext = createContext<ContextValue | null>(null);

const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('RadioGroupItem must be used within RadioGroup');
  }
  return ctx;
};

export { RadioGroupContext, useRadioGroup };
