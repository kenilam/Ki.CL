import {Engine} from '@Component/WebGL';
import * as  ICommon from "@View/Home/Component/Background/Graphic/Common/spec";

class RoundedRect extends Engine.Graphics {
  private color = 0x000000;
  
  public update({x, y, width, height, radius}: ICommon.RoundedRect.UpdateProps) {
    this
    .clear()
    .beginFill(this.color)
    .drawRoundedRect(x, y, width, height, radius)
    .endFill();
  }
}

export default RoundedRect;
