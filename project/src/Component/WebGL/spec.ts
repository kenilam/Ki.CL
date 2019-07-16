import {SurfaceProps} from 'gl-react-dom';

declare module IWebGL {
  interface ClassNames {
    default: string;
  }
  
  type Graphic = any;
  type Render = () => void;
  
  // interface Scene {
  //   graphic: Graphic;
  //   render?: Render;
  // }
  
  interface Props extends SurfaceProps {
  }
  
  // interface Props extends Sizes {
  //   scenes?: Scene[];
  // }
}

export = IWebGL;
