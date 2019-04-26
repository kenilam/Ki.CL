import * as PIXI from "pixi.js";
import {Dispatch, SetStateAction} from "react";

declare module IWebGL {
  type App = PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  type UpdateApp = Dispatch<SetStateAction<App>>;
  
  type Stage = PIXI.Container;
  type UpdateStage = Dispatch<SetStateAction<Stage>>;
  
  interface ChildrenProps {
    app: App;
    stage: Stage;
  }
  
  interface Props {
    className: string;
    height: number;
    width: number;

    children(props: ChildrenProps): void;
  }
}

export = IWebGL;
