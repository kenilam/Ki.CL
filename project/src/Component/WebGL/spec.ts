import * as PIXI from "pixi.js";
import {Dispatch, SetStateAction} from "react";

declare module IWebGL {
  type App = PIXI.CanvasRenderer | PIXI.WebGLRenderer;
  type UpdateApp = Dispatch<SetStateAction<App>>;
  type AppState = [App, UpdateApp];
  
  type Stage = PIXI.Container;
  type UpdateStage = Dispatch<SetStateAction<Stage>>;
  type StageState = [Stage, UpdateStage];
  
  type Graphic = PIXI.Graphics | PIXI.Sprite;
  type Graphics = Graphic[];
  type RendererProps = {
    app: App,
    stage: Stage
  }
  type UpdateRenderer = (props: RendererProps) => void;
  type RendererState = [Graphics, UpdateRenderer?];
  
  interface Props {
    className: string;
    height: number;
    width: number;
    
    renderer(): RendererState;
  }
}

export = IWebGL;
