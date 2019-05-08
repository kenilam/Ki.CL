import * as IWebGL from "@Component/WebGL/spec";
import {Dispatch, SetStateAction} from "react";

declare module IBackgorund {
  type Graphics = IWebGL.Graphics;
  type RendererState = IWebGL.RendererState;
  
  type InitialRun = boolean;
  type UpdateInitialRun = Dispatch<SetStateAction<InitialRun>>;
  type InitialRunState = [InitialRun, UpdateInitialRun];
  
  type DrawRectProps = number[];
  
  type DrawRect = (...props: DrawRectProps) => void;
  
  interface Props {
  }
}

export = IBackgorund;
