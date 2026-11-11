import React, { PropsWithChildren } from 'react';

// Partials
import { Provider as Arranger, useArrangerContext } from './arranger';
import { Provider as Transport, useTransportContext } from './transport';

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Arranger>
      <Transport>{children}</Transport>
    </Arranger>
  );
};

export { Provider, useArrangerContext, useTransportContext };
