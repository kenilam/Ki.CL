import {gsap, PIXI, Tween} from '@/Component/WebGL';
import {RandomNumber} from '@/Helper';
import autobind from 'autobind-decorator';
import {Circle} from './Partial';

import IVisualizer from './spec';

const PARTICLE_COUNTS = 50;
const PARTICLE_GROUP_COUNTS = 10;
const PARTICLE_RATIO = 0.002;
const ROTATION_DURATION = 10000;

const GROUPS = Array.from(new Array(PARTICLE_GROUP_COUNTS));
const CIRCLES = Array.from(new Array(PARTICLE_COUNTS));

class Visualizer extends PIXI.Container {
  private readonly rotations: { angle: number }[] = GROUPS.map(() => ({
    angle: RandomNumber({start: 0, end: 360})
  }));
  private readonly groups: Circle[][] = GROUPS.map(
    (value, index) => {
      if (value) {
        return;
      }
      
      const dimension = this.area * PARTICLE_RATIO;
      
      const container = new PIXI.Container();
      
      container.rotation = this.rotations[index].angle;
      container.alpha = (index + 1) / GROUPS.length;
      
      this.addChild(container);
      
      return CIRCLES.map(
        () => {
          const circle = new Circle({ dimension });
  
          container.addChild(circle);
          
          return circle;
        }
      );
    }
  );
  
  private rotationTween: Tween;
  
  constructor() {
    super();
    
    this.groups.forEach(
      (circles, index) => {
        if (!circles) {
          return;
        }
        
        const rotation = this.rotations[index];
        
        this.rotationTween = Tween.to(rotation, ROTATION_DURATION * (index + 1), {
          ease: gsap.Linear.easeNone,
          angle: 360 * (index % 2 ? -1 : 1),
          repeat: -1,
          onUpdate: this.rotate(index)
        });
      }
    );
  }
  
  private get area() {
    const {
      innerHeight: height,
      innerWidth: width
    } = window;
    
    return height > width ? width : height;
  }
  
  public update({height, width, x, y, ...rest}: IVisualizer.UpdateProps) {
    this.groups.forEach(
      (circles, index) => {
        const parent = circles[0].parent;
        
        parent.x = x + width / 2;
        parent.y = y + height / 2;
        
        circles.forEach(
          (circle, i) => {
            circle.update({
              ...rest,
              height,
              width,
              dimension: this.area * PARTICLE_RATIO * (1 + index / 10),
              distance: this.area / (3 - (index / 5)),
              rotation: Math.PI * 2 / PARTICLE_COUNTS * i,
              x: -width / 2,
              y: -height / 2,
            });
          }
        );
      }
    );
  }
  
  public reset() {
    this.rotationTween.kill();
    
    [].concat(...this.groups).map(
      (circle: Circle) => {
        circle.reset();
      }
    )
  }
  
  @autobind
  private rotate(index: number) {
    return () => {
      const rotation = this.rotations[index].angle;
      const circles = this.groups[index];
      
      circles[0].parent.rotation = rotation;
      circles[RandomNumber({start: 0, end: PARTICLE_COUNTS - 1})].tween();
    }
  }
}

export default Visualizer;
