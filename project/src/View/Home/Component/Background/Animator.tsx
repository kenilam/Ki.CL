import {gsap, Tween, TweenSequence} from "@Component/WebGL";
import * as IBackgorund from "@View/Home/Component/Background/spec";

const FRAME = 24;

const ANIMATION_VALUES = {
  INITIAL(): IBackgorund.Values {
    const {innerHeight, innerWidth} = window;
    
    return {
      alpha: 0,
      height: 0,
      radius: 0,
      width: 0,
      x: innerWidth / 2,
      y: innerHeight / 2
    }
  },
  ZOOMOUT({onComplete, onStart, onUpdate}: IBackgorund.Animator.ValuesProps = {}): IBackgorund.Values {
    const {innerHeight, innerWidth} = window;
    
    return {
      alpha: 1,
      height: innerHeight - (FRAME * 6),
      radius: 0,
      width: FRAME,
      y: FRAME * 3,
      x: innerWidth / 2 - FRAME / 2,
      
      ease: gsap.Linear.easeIn,
      onComplete,
      onStart,
      onUpdate
    }
  },
  ZOOMIN({onComplete, onStart, onUpdate}: IBackgorund.Animator.ValuesProps = {}): IBackgorund.Values {
    const {innerHeight, innerWidth} = window;
    
    return {
      alpha: 1,
      height: innerHeight - (FRAME * 2),
      radius: FRAME,
      width: innerWidth - (FRAME * 2),
      x: FRAME,
      y: FRAME,
      
      ease: gsap.Back.easeOut,
      onComplete,
      onStart,
      onUpdate
    }
  }
};

const generator: IBackgorund.Animator.Generator = ({
  delay = 0,
  duration = 0.6,
  onUpdate,
  onZoomInComplete,
  onZoomInStart,
  onZoomInUpdate,
  onZoomOutComplete,
  onZoomOutStart,
  onZoomOutUpdate
}) => {
  const values: IBackgorund.Values = ANIMATION_VALUES.INITIAL();
  
  const sequenceProps: gsap.TweenConfig = {
    onUpdate: onUpdate.bind(this, values)
  };
  
  const sequence: IBackgorund.Animator.Sequence = new TweenSequence(sequenceProps);
  
  sequence.restart.bind(sequence, [true]);
  sequence.reverse.bind(sequence);
  
  sequence.delay(delay);
  
  sequence.add(
    Tween.set(values, ANIMATION_VALUES.INITIAL())
  );
  
  sequence.add(
    Tween.to(values, duration * 0.3, ANIMATION_VALUES.ZOOMOUT({
      onComplete: onZoomOutComplete && onZoomOutComplete.bind(null, values),
      onStart: onZoomOutStart && onZoomOutStart.bind(null, values),
      onUpdate: onZoomOutUpdate && onZoomOutUpdate.bind(null, values)
    }))
  );
  
  sequence.add(
    Tween.to(values, duration * 0.7, ANIMATION_VALUES.ZOOMIN({
      onComplete: onZoomInComplete && onZoomInComplete.bind(null, values),
      onStart: onZoomInStart && onZoomInStart.bind(null, values),
      onUpdate: onZoomInUpdate && onZoomInUpdate.bind(null, values)
    }))
  );
  
  sequence.pause();
  
  return sequence;
};

export {generator, ANIMATION_VALUES, FRAME};
