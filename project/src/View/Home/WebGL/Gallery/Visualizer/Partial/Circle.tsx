import {PIXI} from '@Component/WebGL';
import {RandomColor} from '@Helper';
import * as IPartial from './spec';

class Circle extends PIXI.Container {
  public readonly color: number = RandomColor().rgbNumber();
  private graphic = new PIXI.Graphics();
  
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
      alpha = 0,
      dimension,
      distance,
      height,
      rotation,
      width,
      x = 0,
      y = 0
    }: IPartial.CircleUpdateProps
  ) {
    const graphic = this.getChildByName('graphic') as PIXI.Graphics;
    
    this.x = x + width / 2;
    this.y = y + height / 2;
    this.rotation = rotation;
    
    graphic.x = distance * alpha;
    graphic.clear();
    graphic.beginFill(this.color);
    graphic.drawCircle(0, 0, dimension);
    graphic.endFill();
  }
}

export default Circle;
