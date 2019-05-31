import {CSSUnitGroup} from '@Helper/CSSUnit';
import {Rect} from '@View/Home/WebGL/Common';
import * as IMask from './spec';
import Style from './Style';

class Mask extends Rect {
  public name = 'mask';
  
  public update(
    {
      alpha = 0,
      height = 0,
      width = 0,
      x = 0,
      y = 0
    }: IMask.UpdateProps
  ) {
    const {fill} = CSSUnitGroup(Style);
  
    super.update({
      alpha,
      fill,
      height,
      width,
      x,
      y
    });
  }
}

export default Mask;
