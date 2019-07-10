import * as IVisualiser from '@/View/Home/WebGL/Gallery/Visualizer/spec';

declare module IPartial {
  type Dimension = number;
  type Distance = number;
  type Name = string;
  type Rotation = number;
  
  interface Style extends IClassNames {
    fill: string;
  }
  
  interface Circle extends PIXI.Container {
    graphic: PIXI.Graphics;
    
    update(porps: CircleUpdateProps): void;
  }
  
  interface CircleProps {
    dimension: Dimension;
  }
  
  interface CircleUpdateProps extends IVisualiser.UpdateProps {
    dimension: Dimension;
    distance: Distance;
    rotation: Rotation;
  }
}

export = IPartial;
