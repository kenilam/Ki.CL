import React, { createContext, PropsWithChildren, useContext } from 'react';

type Glyph = readonly string[];

type Mark = {
  light: { ambient: number; environment: number; key: number };
  occlusion: { halfRes: boolean; quality: 'high' | 'medium'; samples: number };
  ink: 'backgroundColor' | 'color';
  pick: (time: number) => Glyph;
  sway: () => number;
};

const MarkContext = createContext<Mark | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren<Mark>> = ({
  children,
  ink,
  light,
  occlusion,
  pick,
  sway,
}) => {
  return (
    <MarkContext.Provider value={{ ink, light, occlusion, pick, sway }}>
      {children}
    </MarkContext.Provider>
  );
};

const useMark = () => {
  const mark = useContext(MarkContext);

  if (!mark) {
    throw new Error('useMark needs a Mark provider around it.');
  }

  return mark;
};

export { Provider, useMark, type Glyph };
