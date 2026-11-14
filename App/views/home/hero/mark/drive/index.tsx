import React, { PropsWithChildren } from 'react';

import { Provider } from '@/views/mark/context';

import { GLYPHS } from '@/views/home/hero/mark/constants';

const START = 0.4;
const HOLD = 2.6;

const pick = (time: number) => {
  return GLYPHS[Math.floor(Math.max(0, time - START) / HOLD) % GLYPHS.length];
};

const LIGHT = { ambient: 0.1, environment: 1, key: 2.5 };

const OCCLUSION = { halfRes: false, quality: 'high', samples: 8 } as const;

const sway = () => {
  return 0;
};

const Drive: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Provider
      ink='color'
      light={LIGHT}
      occlusion={OCCLUSION}
      pick={pick}
      sway={sway}
    >
      {children}
    </Provider>
  );
};

export { Drive };
