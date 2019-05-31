declare module IGeometry {
  interface CircleProps {
    density?: number;
    radius: number;
    x: number;
    y: number;
  }
  
  type Circle = (props: CircleProps) => Array<{ x: number, y: number }>;
  
  interface RectProps {
    height: number;
    radius?: number;
    width: number;
    x: number;
    y: number;
  }
}

export = IGeometry;
