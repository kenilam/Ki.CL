import { gsap, Tween, TweenSequence } from "@Component/WebGL";
import * as IBackgorund from "@View/Home/Component/Background/spec";

const FRAME = 24;

const ANIMATION_VALUES = {
  INITIAL(): IBackgorund.Animator.Values {
    const { innerHeight, innerWidth } = window;

    return {
      alpha: 0,
      height: 0,
      radius: 0,
      width: 0,
      x: innerWidth / 2,
      y: innerHeight / 2
    }
  },
  ZOOMOUT({ onComplete, onStart, onUpdate }: IBackgorund.Animator.ValuesProps = {}): IBackgorund.Animator.Values {
    const { innerHeight, innerWidth } = window;

    return {
      alpha: 1,
      height: FRAME * 16,
      radius: 0,
      width: FRAME * 2,
      y: innerHeight / 2 - FRAME * 8,
      x: innerWidth / 2 - FRAME,

      delay: 1,
      ease: gsap.Linear.easeIn,
      onComplete,
      onStart,
      onUpdate
    }
  },
  ZOOMIN({ onComplete, onStart, onUpdate }: IBackgorund.Animator.ValuesProps = {}): IBackgorund.Animator.Values {
    const { innerHeight, innerWidth } = window;

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
  onUpdate,
  onZoomInComplete,
  onZoomInStart,
  onZoomInUpdate,
  onZoomOutComplete,
  onZoomOutStart,
  onZoomOutUpdate
}) => {
  const values: IBackgorund.Animator.Values = ANIMATION_VALUES.INITIAL();

  const sequenceProps: gsap.TweenConfig = {
    onUpdate: onUpdate.bind(this, values)
  };

  const sequence: IBackgorund.Animator.Sequence = new TweenSequence(sequenceProps);

  Tween.killAll();

  sequence.add(
    Tween.set(values, ANIMATION_VALUES.INITIAL())
  );

  sequence.add(
    Tween.to(values, 0.1, ANIMATION_VALUES.ZOOMOUT({
      onComplete: onZoomOutComplete && onZoomOutComplete.bind(this, values),
      onStart: onZoomOutStart && onZoomOutStart.bind(this, values),
      onUpdate: onZoomOutUpdate && onZoomOutUpdate.bind(this, values)
    }))
  );

  sequence.add(
    Tween.to(values, 0.3, ANIMATION_VALUES.ZOOMIN({
      onComplete: onZoomInComplete && onZoomInComplete.bind(this, values),
      onStart: onZoomInStart && onZoomInStart.bind(this, values),
      onUpdate: onZoomInUpdate && onZoomInUpdate.bind(this, values)
    }))
  );

  sequence.pause();

  return sequence;
};

export { generator, ANIMATION_VALUES, FRAME };
