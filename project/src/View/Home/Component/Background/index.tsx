import WebGL, {Engine} from '@Component/WebGL';
import {windowSizes} from '@Hook';
import React from 'react';
import * as IBackgorund from './spec';

const Background: React.FC<IBackgorund.Props> = () => {
  const {sizes: {height, width}} = windowSizes();
  
  function render({stage}: IBackgorund.RenderProps) {
    const radius = (height > width ? width : height) / 4;
    const circle = new Engine.Graphics();
    
    circle.beginFill(0x000000);
    circle.drawCircle(width / 2, height / 2, radius);
    circle.endFill();
    
    stage.removeChildren(0);
    stage.addChild(circle);
  }
  
  return (
    <WebGL className='background' height={height} width={width}>
      {render}
    </WebGL>
  );
};

export default Background;
