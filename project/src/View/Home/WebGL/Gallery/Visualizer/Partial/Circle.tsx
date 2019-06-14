import {PIXI} from '@Component/WebGL';
import {RandomColor} from '@Helper';
import * as IPartial from './spec';

class Circle extends PIXI.Container {
  public readonly color: number = RandomColor().rgbNumber();
  public graphic = new PIXI.Graphics();
  
  constructor({dimension}: IPartial.CircleProps) {
    super();
    
    this.graphic.name = 'graphic';
    
    this.graphic.beginFill(this.color);
    this.graphic.drawCircle(0, 0, dimension);
    this.graphic.endFill();
    
    this.addChild(this.graphic);
  }
  
  update(
    {
      dimension,
      distance,
      height,
      rotation,
      width,
      x = 0,
      y = 0
    }: IPartial.CircleUpdateProps
  ) {
    this.x = x + width / 2;
    this.y = y + height / 2;
    this.rotation = rotation;
    
    this.graphic.x = distance;
  
    this.graphic.clear();
    this.graphic.beginFill(this.color);
    this.graphic.drawCircle(0, 0, dimension);
    this.graphic.endFill();
  }
}

export default Circle;
