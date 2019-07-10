import {PIXI} from '@/Component/WebGL';
import Mask from './Mask';
import * as IGallery from './spec';
import Visualizer from './Visualizer';

const mask = new Mask();
const visualizer = new Visualizer();

class Gallery extends PIXI.Container {
  constructor() {
    super();
    
    this.mask = mask;
    
    this.addChild(visualizer);
  }
  
  public update(
    {alpha = 0, height = 0, width = 0, x = 0, y = 0}: IGallery.UpdateProps
  ) {
    this.alpha = alpha;
    mask.update({height, width, x, y});
    
    if (alpha === 0) {
      visualizer.reset();
      
      return;
    }
    
    visualizer.update({height, width, x, y});
  }
}

export default Gallery;
