import React, { PropsWithChildren } from 'react';

// Partials
import { Provider as Piece, usePieceContext } from './piece';
import { Provider as Song, useSongContext } from './song';

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Song>
      <Piece>{children}</Piece>
    </Song>
  );
};

export { Provider, usePieceContext, useSongContext };
