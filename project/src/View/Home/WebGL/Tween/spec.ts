import { gsap } from '@Component/WebGL';

declare module ITween {
  type Delay = number;
  type Duration = number;
  type Ease = gsap.Ease;
  type Pause = boolean;
  
  interface Props {
    delay?: Delay;
    duration: Duration;
    ease?: Ease;
    onComplete?: Handler;
    onStart?: Handler;
    onUpdate?: Handler;
    pause?: Pause;
  }
  
  interface Value {
    value: number
  }
  
  interface Values {
    IN: Value;
    OUT: Value;
  }
  
  type Handler = ( value?: Value ) => void;
}

export = ITween;
