import * as IWebGL from "@Component/WebGL/spec";

declare module IBackgorund {
  interface RenderProps extends IWebGL.ChildrenProps {
  }
  
  type Render = (Porps: RenderProps) => void;
  
  interface Props {
  }
}

export = IBackgorund;
