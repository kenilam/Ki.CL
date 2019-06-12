import {PIXI} from '@Component/WebGL';
import * as IPartial from '@View/Home/WebGL/Gallery/Visualizer/Partial/spec';
import {Circle} from './Partial';

import IVisualizer from './spec';

const PARTICLE_COUNTS = 20;
const PARTICLE_RATIO = 0.01;

class Visualizer extends PIXI.Container {
  private get area() {
    const {
      innerHeight: height,
      innerWidth: width
    } = window;
    
    return height > width ? width : height;
  }
  
  private makeCircles(): IPartial.Circle[] {
    return (
      Array.from(
        new Array(PARTICLE_COUNTS)
      ).map(
        () => {
          const circle = new Circle({
            dimension: this.area * PARTICLE_RATIO
          });
          
          this.addChild(circle);
          
          return circle;
        }
      )
    );
  }
  
  private updateCircles(
    { circles, props, distanceScale }: {
      circles: IPartial.Circle[],
      props: IVisualizer.UpdateProps,
      distanceScale: number
    }
  ) {
    circles.forEach(
      (circle, index) => {
        circle.update({
          ...props,
          dimension: this.area * PARTICLE_RATIO,
          distance: this.area / distanceScale,
          rotation: Math.PI * 2 / PARTICLE_COUNTS * index,
        });
      }
    );
  }
  
  private readonly inner = this.makeCircles();
  private readonly middle = this.makeCircles();
  private readonly outer = this.makeCircles();
  private readonly external = this.makeCircles();
  
  constructor() {
    super();
  }
  
  public update(props: IVisualizer.UpdateProps) {
    this.updateCircles({ circles: this.inner, props, distanceScale: 3} );
    this.updateCircles({ circles: this.middle, props, distanceScale: 2.5} );
    this.updateCircles({ circles: this.outer, props, distanceScale: 2} );
    this.updateCircles({ circles: this.external, props, distanceScale: 1.5} );
  }
}

export default Visualizer;
