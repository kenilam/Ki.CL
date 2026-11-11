import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useKnowledge } from './use-knowledge';

const KnowledgeContext = createContext<ReturnType<typeof useKnowledge> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const knowledge = useKnowledge();

  return (
    <KnowledgeContext.Provider value={knowledge}>
      {children}
    </KnowledgeContext.Provider>
  );
};

const useKnowledgeContext = () => {
  const knowledge = useContext(KnowledgeContext);

  if (!knowledge) {
    throw new Error(
      'useKnowledgeContext needs the knowledge Provider around it.'
    );
  }

  return knowledge;
};

export { Provider, useKnowledgeContext };
