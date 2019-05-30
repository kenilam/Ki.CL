import { PIXI } from '@Component/WebGL';
import * as IRoundedRect from './spec';

class RoundedRect extends PIXI.Graphics {
  
  public alpha = 0;
  
  public update(
    {
      alpha = 0,
      fill = 0x000000,
      height = 0,
      radius = 0,
      width = 0,
      x = 0,
      y = 0
    }: IRoundedRect.UpdateProps = {}
  ) {
    this
    .clear()
    .beginFill( fill )
    .drawRoundedRect( x, y, width, height, radius )
    .endFill();
    
    this.alpha = alpha;
  }
}

export default RoundedRect;
