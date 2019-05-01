import * as PIXI from "pixi.js";
import {Dispatch, SetStateAction} from "react";

declare module IWebGL {
  type App = PIXI.Renderer;
  type UpdateApp = Dispatch<SetStateAction<App>>;
  type AppState = [App, UpdateApp];
  
  type Stage = PIXI.Container;
  type UpdateStage = Dispatch<SetStateAction<Stage>>;
  type StageState = [Stage, UpdateStage];
  
  type Graphic = PIXI.Graphics;
  type Graphics = Graphic[];
  type RendererProps = {
    app: App,
    stage: Stage
  }
  type UpdateRenderer = (props: RendererProps) => void;
  type RendererState = [Graphics, UpdateRenderer];
  
  interface Props {
    className: string;
    height: number;
    renderer(): RendererState;
    width: number;
  }
}

export = IWebGL;
