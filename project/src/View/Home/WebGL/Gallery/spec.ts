import {Alpha, Height, Radius, Width, X, Y} from '@View/Home/WebGL/Common/spec';

declare module IGallery {
  interface UpdateProps {
    alpha?: Alpha;
    height?: Height;
    radius?: Radius;
    width?: Width;
    x?: X;
    y?: Y;
  }
}

export = IGallery;
