import React, { createContext, PropsWithChildren, useContext } from 'react';

import { useResizeObserver } from 'design/hooks';

type Stage = Pick<
  ReturnType<typeof useResizeObserver<HTMLDivElement>>,
  'node'
> & {
  columns: number;
};

const StageContext = createContext<Stage | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { node, rect } = useResizeObserver<HTMLDivElement>();

  return (
    <StageContext.Provider value={{ columns: rect?.width ?? 0, node }}>
      {children}
    </StageContext.Provider>
  );
};

const useStage = () => {
  const stage = useContext(StageContext);

  if (!stage) {
    throw new Error('useStage needs a Stage provider around it.');
  }

  return stage;
};

export { Provider, useStage };
