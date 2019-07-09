import {CSSUnitGroup} from '@/Helper/CSSUnit';
import {Rect} from '@/View/Home/WebGL/Common';
import * as IMask from './spec';
import Style from './Style';

class Mask extends Rect {
  public name = 'mask';
  
  public update(
    {
      alpha = 0,
      height = 0,
      radius,
      width = 0,
      x = 0,
      y = 0
    }: IMask.UpdateProps
  ) {
    const {bleed, fill, radius: CSSRadius} = CSSUnitGroup(Style);
    
    super.update({
      alpha,
      fill,
      height: height - bleed * 2,
      radius: (radius === undefined ? CSSRadius : radius) * alpha,
      width: width - bleed * 2,
      x: x + bleed,
      y: y + bleed
    });
  }
}

export default Mask;
