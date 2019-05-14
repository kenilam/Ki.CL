import {gsap, Tween, TweenSequence} from "@Component/WebGL";
import * as IBackgorund from "@View/Home/Component/Background/spec";

const FRAME = 24;

const ANIMATION_PROPERTIES = {
  INITIAL(): IBackgorund.Animator.Values {
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
  ZOOMOUT(): IBackgorund.Animator.Values {
    const {innerHeight, innerWidth} = window;
    
    return {
      alpha: 1,
      height: FRAME * 16,
      radius: 0,
      width: FRAME * 2,
      y: innerHeight / 2 - FRAME * 8,
      x: innerWidth / 2 - FRAME,
      
      delay: 1,
      ease: gsap.Linear.easeIn,
    }
  },
  ZOOMIN(): IBackgorund.Animator.Values {
    const {innerHeight, innerWidth} = window;
    
    return {
      alpha: 1,
      height: innerHeight - (FRAME * 2),
      radius: FRAME,
      width: innerWidth - (FRAME * 2),
      x: FRAME,
      y: FRAME,
      
      ease: gsap.Back.easeOut
    }
  }
};

const generator: IBackgorund.Animator.Generator = onUpdateHandler => {
  const values: IBackgorund.Animator.Values = ANIMATION_PROPERTIES.INITIAL();
  
  const sequenceProps: gsap.TweenConfig = {
    onUpdate: () => {
      onUpdateHandler(values);
    }
  };
  
  const sequence: IBackgorund.Animator.Sequence = new TweenSequence(sequenceProps);
  
  Tween.killAll();
  
  sequence.add(
    Tween.set(values, ANIMATION_PROPERTIES.INITIAL())
  );
  
  sequence.add(
    Tween.to(values, 0.1, ANIMATION_PROPERTIES.ZOOMOUT())
  );
  
  sequence.add(
    Tween.to(values, 0.3, ANIMATION_PROPERTIES.ZOOMIN())
  );
  
  sequence.pause();
  
  return sequence;
};

export {generator, ANIMATION_PROPERTIES, FRAME};
