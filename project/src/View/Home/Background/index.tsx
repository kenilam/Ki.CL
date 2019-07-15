import {WindowSizes} from '@/Hook';
import React from 'react';
import {WebGL} from '@/Component';
import Test from './Test';

const Background = () => {
  const {
    sizes: { height, width }
  } = WindowSizes();
  
  return (
    <WebGL
      height={height}
      width={width}
    >
      <Test/>
    </WebGL>
  );
};

export default Background;
