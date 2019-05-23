import * as gsap from 'gsap';
import {TimelineMax, TweenMax} from 'gsap';
import * as PIXI from 'pixi.js';
import React, {DependencyList, useCallback, useEffect, useState} from 'react';
import * as Geometry from './Geometry';
import * as IWebGL from './spec';
import Style from './Style';

const options = {
  antialias: true,
  autoResize: true,
  transparent: true
};

const WebGL: React.FunctionComponent<IWebGL.Props> = ({
  className,
  height,
  render,
  width,
}) => {
  let rendererFrame: number;
  
  const [app, updateApp]: IWebGL.AppState = useState<IWebGL.App>();
  const [stage, updateStage]: IWebGL.StageState = useState<IWebGL.Stage>();
  const [graphics, updateGraphics]: IWebGL.RenderState = render();
  
  function renderer() {
    if (!app || !stage) {
      return;
    }
    
    (app as PIXI.Renderer).render(stage);
    
    rendererFrame = window.requestAnimationFrame(renderer);
  }
  
  function triggerRender() {
    if (!stage) {
      updateStage(new PIXI.Container());
      return;
    }
    
    stage.removeChildren(0);
    
    graphics.map(
      graphic => {
        stage.addChild(graphic);
      }
    );
    
    updateGraphics && updateGraphics({app, stage});
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
        }) as PIXI.Renderer
      );
      return;
    }
    
    (app as PIXI.Renderer).resize(width, height);
  }, [width, height] as DependencyList);
  
  function onMount() {
    
    renderer();
    
    triggerRender();
  }
  
  function onUnmount() {
    window.cancelAnimationFrame(rendererFrame);
  }
  
  useEffect(() => {
    onMount();
    
    return onUnmount;
  });
  
  return (
    <canvas
      className={className}
      data-component={Style.default}
      ref={ref}
    />
  );
};

PIXI.settings.RESOLUTION = window.devicePixelRatio;

export {PIXI, Geometry, TweenMax as Tween, TimelineMax as TweenSequence, gsap};
export default WebGL;
