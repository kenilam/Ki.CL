import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
} from 'react';

// Constants
import type { Shot } from '@/views/blog/spatial-css/stage/shots';

type Scene = {
  mark: (shot: Shot) => void;
  read: () => Shot;
};

const SceneContext = createContext<Scene | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const shot = useRef<Shot>('intro');

  const scene = useMemo(() => {
    return {
      mark: (next: Shot) => {
        shot.current = next;
      },
      read: () => {
        return shot.current;
      },
    };
  }, []);

  return (
    <SceneContext.Provider value={scene}>{children}</SceneContext.Provider>
  );
};

const useScene = () => {
  const scene = useContext(SceneContext);

  if (!scene) {
    throw new Error('useScene needs the post’s Provider around it.');
  }

  return scene;
};

export { Provider, useScene };
