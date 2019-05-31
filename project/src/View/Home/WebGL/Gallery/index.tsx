import {PIXI} from '@Component/WebGL';
import Mask from './Mask';
import * as IGallery from './spec';

const mask = new Mask();

// const experiments = [
//   1, 2, 3, 4
// ];

class Gallery extends PIXI.Container {
  constructor() {
    super();
    
    this.mask = mask;
  }
  
  public update(
    {
      alpha = 0,
      height = 0,
      width = 0,
      x = 0,
      y = 0
    }: IGallery.UpdateProps
  ) {
    mask.update({
      alpha,
      height,
      width,
      x,
      y
    });
  }
}

export default Gallery;
