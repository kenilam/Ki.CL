import {PIXI, Tween} from '@/Component/WebGL';
import {RandomColor, RandomNumber} from '@/Helper';
import * as IPartial from './spec';

const SCALE_DURATION = 10;
const MAX_DELAY = 10;
const MAX_SCALE = 5;
const MIN_SCALE = 3;

class Circle extends PIXI.Container {
  public readonly color: number = RandomColor().rgbNumber();
  public graphic = new PIXI.Graphics();
  
  private scaleTween: Tween;
  
  constructor({dimension}: IPartial.CircleProps) {
    super();
    
    this.graphic.name = 'graphic';
    
    this.graphic.beginFill(this.color);
    this.graphic.drawCircle(0, 0, dimension);
    this.graphic.endFill();
    
    this.addChild(this.graphic);
    
    this.tween();
  }
  
  public tween() {
    if (Tween.isTweening(this.graphic.scale)) {
      return;
    }
    
    const scale = RandomNumber({start: 0, end: RandomNumber({start: MIN_SCALE, end: MAX_SCALE})});
    const delay = RandomNumber({start: 0, end: MAX_DELAY});
    
    this.scaleTween = Tween.to(
      this.graphic.scale,
      SCALE_DURATION,
      {x: scale, y: scale, yoyo: true, repeat: 1, delay}
    );
  }
  
  public reset() {
    if (!this.scaleTween) {
      return;
    }
    
    this.scaleTween.kill();
  }
  
  public update(
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
