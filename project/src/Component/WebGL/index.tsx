import * as gsap from 'gsap';
import {TweenMax, TimelineMax} from 'gsap';
import * as PIXI from 'pixi.js';
import * as Filters from 'pixi-filters';
import React, {DependencyList, useCallback, useEffect, useState} from 'react';
import * as Geometry from './Geometry';
import * as IWebGL from './spec';

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
  
    (app as PIXI.CanvasRenderer).render(stage);
    
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
        }) as PIXI.CanvasRenderer
      );
      return;
    }
    
    (app as PIXI.CanvasRenderer).resize(width, height);
  }, [width, height] as DependencyList);
  
  function onMount() {
  
    render();
  
    triggerRenderer();
  }
  
  function onUnmount() {
    window.cancelAnimationFrame(renderFrame);
  }
  
  useEffect(() => {
    onMount();
    
    return onUnmount;
  });
  
  return (
    <canvas className={className} ref={ref} />
  );
};

PIXI.settings.RESOLUTION = window.devicePixelRatio;

Object.assign(PIXI.filters, Filters);

export {PIXI as Engine, Geometry, TweenMax as Tween, TimelineMax as TweenSequence, gsap};
export default WebGL;
