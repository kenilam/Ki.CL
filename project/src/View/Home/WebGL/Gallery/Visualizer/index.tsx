import {gsap, PIXI, Tween} from '@Component/WebGL';
import {RandomNumber} from "@Helper";
import autobind from "autobind-decorator";
import {Circle} from './Partial';

import IVisualizer from './spec';

const PARTICLE_COUNTS = 50;
const PARTICLE_GROUP_COUNTS = 10;
const PARTICLE_RATIO = 0.002;
const ROTATION_DURATION = 10000;
const SCALE_DURATION = 10;

const GROUPS = Array.from(new Array(PARTICLE_GROUP_COUNTS));
const CIRCLES = Array.from(new Array(PARTICLE_COUNTS));

class Visualizer extends PIXI.Container {
  private readonly rotations: {angle: number}[] = GROUPS.map(() => ({
    angle: RandomNumber({start: 0, end: 360})
  }));
  private readonly circles: Circle[][] = GROUPS.map(
    (value, index) => {
      if (value) {
        return;
      }
  
      const container = new PIXI.Container();
  
      container.rotation = this.rotations[index].angle;
      container.alpha = (index + 1) / GROUPS.length;
  
      this.addChild(container);
  
      return CIRCLES.map(
        () => {
          const circle = new Circle({
            dimension: this.area * PARTICLE_RATIO
          });
      
          container.addChild(circle);
      
          return circle;
        }
      );
    }
  );
  
  private get area() {
    const {
      innerHeight: height,
      innerWidth: width
    } = window;
    
    return height > width ? width : height;
  }
  
  constructor() {
    super();
    
    this.circles.forEach(
      (circles, index) => {
        if (!circles) {
          return;
        }
        
        const rotation = this.rotations[index];
        
        Tween.to(rotation, ROTATION_DURATION * ( index + 1), {
          ease: gsap.Linear.easeNone,
          angle: 360 * (index % 2 ? -1 : 1),
          repeat: -1,
          onUpdate: this.rotate(index)
        });
      }
    );
  }
  
  @autobind
  private rotate(index: number) {
    return () => {
      const rotation = this.rotations[index].angle;
      const circles = this.circles[index];
      
      circles[0].parent.rotation = rotation;
  
      const randomCircle = this.circles
        [index]
        [RandomNumber({start: 0, end: PARTICLE_COUNTS - 1})];
      
      if (
        Tween.isTweening(randomCircle.graphic.scale)
      ) {
        return;
      }
      
      const scaleUp = RandomNumber({start: 2, end: RandomNumber({start: 3, end: 5}) });
      const delay = RandomNumber({start: 0, end: 10});
  
      Tween.fromTo(
        randomCircle.graphic.scale,
        SCALE_DURATION,
        { x: 0, y: 0 },
        { x: scaleUp, y: scaleUp, yoyo: true, repeat: 1, delay }
      );
    }
  }
  
  public update({ height, width, x, y, ...rest }: IVisualizer.UpdateProps) {
    this.circles.forEach(
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
              x: -width/2,
              y: -height/2,
            });
          }
        );
      }
    );
  }
}

export default Visualizer;
