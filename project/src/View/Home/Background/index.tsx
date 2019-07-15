import {WindowSizes} from "@/Hook";
import React from 'react';
import {WebGL} from '@/Component';
import Globe from './Globe';

const Background = () => {
  const {
    sizes: { height, width }
  } = WindowSizes();
  
  return (
    <WebGL
      height={height}
      width={width}
      scenes={Globe}
    />
  );
};

export default Background;
