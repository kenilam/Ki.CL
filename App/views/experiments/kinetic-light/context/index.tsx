import React, { PropsWithChildren } from 'react';

// Partials
import { Provider as Generate, useGenerateContext } from './generate';
import { Provider as Songs, useSongsContext } from './songs';

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Generate>
      <Songs>{children}</Songs>
    </Generate>
  );
};

export { Provider, useGenerateContext, useSongsContext };
