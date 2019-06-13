import {gsap, PIXI, Tween} from '@Component/WebGL';
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
    const container = new PIXI.Container();
    
    this.addChild(container);
    
    return (
      Array.from(
        new Array(PARTICLE_COUNTS)
      ).map(
        () => {
          const circle = new Circle({
            dimension: this.area * PARTICLE_RATIO
          });
  
          container.addChild(circle);
          
          return circle;
        }
      )
    );
  }
  
  private updateCircles(
    { circles, distanceScale, props }: {
      circles: IPartial.Circle[],
      distanceScale: number,
      props: IVisualizer.UpdateProps
    }
  ) {
    const { height, width, x, y, ...rest } = props;
    
    circles[0].parent.x = x + width / 2;
    circles[0].parent.y = y + height / 2;
    
    circles.forEach(
      (circle, index) => {
        circle.update({
          ...rest,
          height,
          width,
          dimension: this.area * PARTICLE_RATIO,
          distance: this.area / distanceScale,
          rotation: Math.PI * 2 / PARTICLE_COUNTS * index,
          x: -width/2,
          y: -height/2
        });
      }
    );
  }
  
  private readonly inner = this.makeCircles();
  private readonly middle = this.makeCircles();
  private readonly outer = this.makeCircles();
  private readonly external = this.makeCircles();
  
  private readonly innerContainer = this.inner[0].parent;
  private readonly middleContainer = this.middle[0].parent;
  private readonly outerContainer = this.outer[0].parent;
  private readonly externalContainer = this.external[0].parent;
  
  constructor() {
    super();
    
    Tween.to(this.innerContainer, 7200, {
      ease: gsap.Linear.easeNone,
      rotation: 360,
      repeat: -1
    });
  
    Tween.to(this.middleContainer, 7200 * 2, {
      ease: gsap.Linear.easeNone,
      rotation: 360,
      repeat: -1
    });
  
    Tween.to(this.outerContainer, 7200 * 3, {
      ease: gsap.Linear.easeNone,
      rotation: 360,
      repeat: -1
    });
  
    Tween.to(this.externalContainer, 7200 * 4, {
      ease: gsap.Linear.easeNone,
      rotation: 360,
      repeat: -1
    });
  }
  
  public update(props: IVisualizer.UpdateProps) {
    this.updateCircles({ circles: this.inner, props, distanceScale: 3} );
    this.updateCircles({ circles: this.middle, props, distanceScale: 2.5} );
    this.updateCircles({ circles: this.outer, props, distanceScale: 2} );
    this.updateCircles({ circles: this.external, props, distanceScale: 1.5} );
  }
  
  public destroy() {
    super.destroy();
  }
}

export default Visualizer;
