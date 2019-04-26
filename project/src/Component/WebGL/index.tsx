import * as PIXI from 'pixi.js';
import React, {useCallback, useEffect, useState} from 'react';
import * as IWebGL from './spec';

PIXI.settings.RESOLUTION = window.devicePixelRatio;

const options: PIXI.RendererOptions = {
  antialias: true,
  autoResize: true,
  transparent: true
};

const WebGL: React.FC<IWebGL.Props> = ({
  children,
  className,
  width,
  height
}) => {
  let animateFrame: number;
  
  const [app, updateApp] = useState<IWebGL.App>();
  const [stage, updateStage] = useState<IWebGL.Stage>();
  
  function animate() {
    if (!app || !stage) {
      return;
    }
    
    app.render(stage);
    animateFrame = window.requestAnimationFrame(animate);
  }
  
  const ref = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }
    
    if (!app) {
      updateApp(
        PIXI.autoDetectRenderer(
          width,
          height,
          {...options, view: canvas}
        )
      );
      
      return;
    }
    
    app.resize(width, height);
  }, [width, height] as ReadonlyArray<React.PropsWithChildren<any>>);
  
  useEffect(() => {
    if (!stage) {
      updateStage(new PIXI.Container());
      return;
    }
    
    animate();
    
    return () => {
      window.cancelAnimationFrame(animateFrame);
    }
  });
  
  return (
    <canvas className={className} ref={ref}>
      {app && stage && children({app, stage})}
    </canvas>
  );
};

export {PIXI as Engine};
export default WebGL;
