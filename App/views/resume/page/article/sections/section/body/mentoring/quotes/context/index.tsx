import React, { createContext, useContext, useState } from 'react';

type Value = {
  opened: string | null;
  setOpened: (writtenAt: string | null) => void;
};

const QuotesContext = createContext<Value | null>(null);

const Provider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const [opened, setOpened] = useState<Value['opened']>(null);

  return (
    <QuotesContext.Provider value={{ opened, setOpened }}>
      {children}
    </QuotesContext.Provider>
  );
};

const useOpen = (writtenAt: string) => {
  const quotes = useContext(QuotesContext);

  if (!quotes) {
    throw new Error('useOpen needs the Quotes provider around it.');
  }

  const open = quotes.opened === writtenAt;

  return {
    open,
    toggle: () => {
      quotes.setOpened(open ? null : writtenAt);
    },
  };
};

export { Provider, useOpen };
