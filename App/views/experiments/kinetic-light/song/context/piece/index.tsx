import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { usePiece } from './use-piece';

const PieceContext = createContext<ReturnType<typeof usePiece> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = usePiece();

  return (
    <PieceContext.Provider value={value}>{children}</PieceContext.Provider>
  );
};

const usePieceContext = () => {
  const value = useContext(PieceContext);

  if (!value) {
    throw new Error('usePieceContext needs a Piece context above it.');
  }

  return value;
};

export { Provider, usePieceContext };
