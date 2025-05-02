import React, { PropsWithChildren, useContext, useState } from 'react';

// Spec
import * as Spec from './Spec';

type Value = Spec.Props & {
  date?: Date;
  setDate(number): void;
};

const OFFSET = 3; // Days

const current = new Date();

current.setDate(current.getDate() + OFFSET);

const DEFAULT: Value = {
  date: current,
  onChange() {},
  onSelect() {},
  setDate() {},
};

const Context = React.createContext(DEFAULT);

const SchedularProvider: React.FunctionComponent<
  PropsWithChildren<Spec.Props>
> = ({
  children,
  onMonthChange: monthChangeHandler,
  onSelect: selectHandler,
  ...rest
}) => {
  const [date, setDate] = useState<Date>();

  const onMonthChange: Spec.Props['onMonthChange'] = (date) => {
    setDate(undefined);

    monthChangeHandler?.(date);
  };

  const onSelect: Spec.Props['onSelect'] = (date, event) => {
    if (date) {
      setDate(date);
    }

    selectHandler(date, event);
  };

  const value = {
    ...rest,
    date,
    onMonthChange,
    onSelect,
    setDate,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useSchedularContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { DEFAULT, useSchedularContext };
export default SchedularProvider;
