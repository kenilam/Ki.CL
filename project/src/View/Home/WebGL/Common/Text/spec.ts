import {Alpha, Height, Width, X, Y} from '@/View/Home/WebGL/Common/spec';

declare module IText {
  type Style = {
    [name in StyleNames]?: PIXI.TextStyle[StyleNames];
  }
  
  type StyleNames = keyof PIXI.TextStyle;
  type Text = string;
  type Tick = boolean;
  type Zoom = boolean;
  
  interface Props {
    tick?: boolean;
    style: Style,
    text: string,
    zoom?: Zoom
  }
  
  interface UpdateProps {
    alpha?: Alpha;
    height?: Height;
    width?: Width;
    x?: X;
    y?: Y;
  }
}

export = IText;
