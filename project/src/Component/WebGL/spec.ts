declare module IWebGL {
  interface ClassNames {
    default: string;
  }
  
  type Graphic = any;
  type Render = () => void;
  
  interface Scene {
    graphic: Graphic;
    render?: Render;
  }
  
  interface Sizes {
    height: number;
    width: number;
  }
  
  interface Props extends Sizes {
    scenes?: Scene[];
  }
}

export = IWebGL;
