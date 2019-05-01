import WebGL, {Engine, Tween} from '@Component/WebGL';
import {windowSizes} from '@Hook';
import React from 'react';
import * as IBackgorund from './spec';

const graphics: IBackgorund.Graphics = [];

const Background: React.FC<IBackgorund.Props> = () => {
  const {sizes: {height, width}} = windowSizes();
  
  function updateRenderer({stage}: IBackgorund.RendererProps) {
    const x = width / 2;
    const y = height / 2;
    
    const circle = stage.getChildByName('circle');
  
    Tween.set(circle, {x, y});
  }
  
  function renderer() {
    const radius = (height > width ? width : height) / 4;
    
    if (graphics.length === 0) {
      const circle = new Engine.Graphics();
  
      circle.beginFill(0x000000);
      circle.drawCircle(0, 0, radius);
      circle.endFill();
      circle.name = 'circle';
  
      graphics.push(circle);
    }
    
    return [
      graphics,
      updateRenderer
    ] as IBackgorund.RendererState;
  }
  
  return (
    <WebGL
      className='background'
      height={height}
      renderer={renderer}
      width={width}
    />
  );
};

export default Background;
