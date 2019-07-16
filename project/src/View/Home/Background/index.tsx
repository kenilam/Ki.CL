import {WindowSizes} from '@/Hook';
import React from 'react';
import {WebGL} from '@/Component';
import Index from './Test';

const Background = () => {
  const {
    sizes: { height, width }
  } = WindowSizes();
  
  return (
    <WebGL
      height={height}
      width={width}
    >
      <Index/>
    </WebGL>
  );
};

export default Background;
