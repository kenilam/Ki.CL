import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import { readPalette } from '@/views/experiments/kinetic-light/stage/palette';

// Geometry
import { toGeometry } from '@/views/experiments/kinetic-light/stage/sheet/geometry';

type Value = {
  geometry: THREE.BufferGeometry;
  palette: ReturnType<typeof readPalette>;
};

const SheetContext = createContext<Value | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { sheet } = useStageContext();
  const { gl } = Fiber.useThree();
  const palette = useMemo(() => readPalette(gl.domElement), [gl]);
  const geometry = useMemo(() => toGeometry(sheet.svg), [sheet]);

  useEffect(() => () => geometry?.dispose(), [geometry]);

  if (!geometry) {
    return null;
  }

  return (
    <SheetContext.Provider value={{ geometry, palette }}>
      {children}
    </SheetContext.Provider>
  );
};

const useSheetContext = () => {
  const value = useContext(SheetContext);

  if (!value) {
    throw new Error('useSheetContext needs a Sheet context above it.');
  }

  return value;
};

export { Provider, useSheetContext };
