import * as IRoundedRect from '@View/Home/WebGL/Common/Rect/spec';

declare module IVisualiser {
  interface Style extends IClassNames {
    fill: string;
  }
  
  interface UpdateProps extends IRoundedRect.UpdateProps {
  }
}

export = IVisualiser;
