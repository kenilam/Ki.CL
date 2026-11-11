import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useObstacles } from './use-obstacles';

const ObstaclesContext = createContext<ReturnType<typeof useObstacles> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const obstacles = useObstacles();

  return (
    <ObstaclesContext.Provider value={obstacles}>
      {children}
    </ObstaclesContext.Provider>
  );
};

const useObstaclesContext = () => {
  const obstacles = useContext(ObstaclesContext);

  if (!obstacles) {
    throw new Error(
      'useObstaclesContext needs the obstacles Provider around it.'
    );
  }

  return obstacles;
};

export { Provider, useObstaclesContext };
