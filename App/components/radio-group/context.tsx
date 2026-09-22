import { createContext, useContext } from 'react';

import type { RadioGroupProps } from './spec';

type ContextValue = Pick<
  RadioGroupProps,
  'defaultValue' | 'required' | 'value'
> & {
  name: string;
  onValueChange: (value: string) => void;
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
