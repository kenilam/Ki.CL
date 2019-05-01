import * as IWebGL from "@Component/WebGL/spec";

declare module IBackgorund {
  type Graphics = IWebGL.Graphics;
  type RendererProps = IWebGL.RendererProps;
  type RendererState = IWebGL.RendererState;
  
  interface Props {
  }
}

export = IBackgorund;
