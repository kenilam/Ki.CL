import {gsap} from '@Component/WebGL';
import * as IWebGL from '@Component/WebGL/spec';
import * as ITween from '@View/Home/WebGL/Tween/spec';

const TWEEN_VALUES: ITween.Values = {
  IN: {value: 0},
  OUT: {value: 1},
};

class Tween {
  public values: ITween.Value = Object.assign({...TWEEN_VALUES.IN});
  
  public sequence: IWebGL.TweenSequence;
  
  private readonly duration: ITween.Duration;
  
  constructor({
    delay = 0,
    duration,
    ease = gsap.Back.easeOut,
    onComplete,
    onStart,
    onUpdate,
    pause = true
  }: ITween.Props) {
    this.duration = duration;
    
    this.sequence = new gsap.TimelineMax({
      delay,
      duration,
      onComplete: onComplete && onComplete.bind(this, this.values),
      onReverseComplete: onComplete && onComplete.bind(this, this.values),
      onStart: onStart && onStart.bind(this, this.values),
      onUpdate: onUpdate && onUpdate.bind(this, this.values),
      pause
    });
    
    this.sequence.add(
      gsap.TweenMax.set(this.values, TWEEN_VALUES.IN)
    );
    this.sequence.add(
      gsap.TweenMax.to(this.values, this.duration, {...TWEEN_VALUES.OUT, ease})
    );
  }
  
  public kill() {
    this.sequence.kill();
  }
  
  public reset() {
    this.kill();
    this.values = TWEEN_VALUES.IN;
  }
  
  public reverse() {
    this.sequence.reverse(0);
  }
  
  public start() {
    this.sequence.restart(true);
  }
}

export {gsap}
export default Tween;
