import * as PIXI from 'pixi.js';
import React, {DependencyList, useCallback, useEffect, useState} from 'react';
import * as IWebGL from './spec';
import { TweenMax } from 'gsap';

PIXI.settings.RESOLUTION = window.devicePixelRatio;

const options = {
  antialias: true,
  autoResize: true,
  transparent: true
};

const WebGL: React.FC<IWebGL.Props> = ({
  className,
  height,
  renderer,
  width,
}) => {
  let renderFrame: number;
  
  const [app, updateApp]: IWebGL.AppState = useState<IWebGL.App>();
  const [stage, updateStage]: IWebGL.StageState = useState<IWebGL.Stage>();
  const [graphics, updateGraphics]: IWebGL.RendererState = renderer();
  
  function render() {
    if (!app || !stage) {
      return;
    }
    
    app.render(stage);
    
    renderFrame = window.requestAnimationFrame(render);
  }
  
  function triggerRenderer() {
    if (!stage) {
      updateStage(new PIXI.Container());
      return;
    }
    
    stage.removeChildren(0);
    TweenMax.killAll(false);
    
    graphics.map(
      graphic => {
        stage.addChild(graphic);
      }
    );
  
    updateGraphics({app, stage});
  }
  
  const ref = useCallback((view: HTMLCanvasElement) => {
    if (!view) {
      return;
    }
    
    if (!app) {
      updateApp(
        PIXI.autoDetectRenderer({
          ...options,
          height,
          width,
          view
        })
      );
      return;
    }
  
    app.resize(width, height);
  }, [width, height] as DependencyList);
  
  useEffect(() => {
    render();
    
    triggerRenderer();
  
    return () => {
      window.cancelAnimationFrame(renderFrame);
    }
  });
  
  return (
    <canvas className={className} ref={ref}/>
  );
};

export {PIXI as Engine, TweenMax as Tween};
export default WebGL;
