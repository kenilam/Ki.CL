import { Alpha, Color, Height, Radius, Width, X, Y } from '@View/Home/WebGL/Common/spec';

declare module IRoundedRect {
  interface UpdateProps {
    alpha?: Alpha;
    fill?: Color;
    height?: Height;
    radius?: Radius;
    width?: Width;
    x?: X;
    y?: Y;
  }
}

export = IRoundedRect;
