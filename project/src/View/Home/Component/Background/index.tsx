import WebGL, { Engine, Tween, TweenSequence, gsap } from '@Component/WebGL';
import { windowSizes } from '@Hook';
import React, { useEffect, useState } from 'react';
import * as IBackgorund from "./spec";

const { innerHeight, innerWidth } = window;

const FRAME = 24;

const MASK_FILL = 0x000000;

const INITIAL_ANIMATION_PROPERTIES = {
  alpha: 0,
  height: 0,
  radius: 0,
  width: 0,
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const backfill = new Engine.Graphics();
const hero: Engine.Container = new Engine.Container();
const texture = Engine.Texture.from('/image/noise.black.blur.jpg');
const image = new Engine.TilingSprite(texture, innerWidth, innerHeight);
const mask: Engine.Graphics = new Engine.Graphics();

const drawGraphics: IBackgorund.DrawRect = (alpha, x, y, w, h, r) => {
  hero.alpha = alpha;

  mask
    .clear()
    .beginFill(MASK_FILL)
    .drawRoundedRect(x, y, w, h, r)
    .endFill();
};

const Background: React.FC<IBackgorund.Props> = ({ onCompleteHanlder }) => {
  const [initialRun = true, updateInitialRun]: IBackgorund.InitialRunState = useState<IBackgorund.InitialRun>();

  const { sizes: { height, width } } = windowSizes();

  function onComplete() {
    updateInitialRun(false);
    onCompleteHanlder && onCompleteHanlder();
  }

  function onUpdate() {
    const { alpha, height, radius, width, x, y } = INITIAL_ANIMATION_PROPERTIES;

    drawGraphics(alpha, x, y, width, height, radius);
  }

  function animations() {
    const sequence = new TweenSequence({ onComplete, onUpdate });

    sequence.add(
      Tween.to(INITIAL_ANIMATION_PROPERTIES, 0.1, {
        alpha: 1,
        height: FRAME * 16,
        width: FRAME * 2,
        y: height / 2 - FRAME * 8,
        x: width / 2 - FRAME,

        delay: 1,
        ease: gsap.Linear.ease,
      })
    );

    sequence.add(
      Tween.to(INITIAL_ANIMATION_PROPERTIES, 0.3, {
        height: height - (FRAME * 2),
        radius: FRAME,
        width: width - (FRAME * 2),
        x: FRAME,
        y: FRAME,

        ease: gsap.Back.easeOut,
      })
    );

    sequence.delay(0.5);
    sequence.pause();

    return sequence;
  }

  function onMount() {
    backfill.drawRect(0, 0, width, height);

    image.height = height;
    image.width = width;

    if (!initialRun) {
      drawGraphics(1, FRAME, FRAME, width - (FRAME * 2), height - (FRAME * 2), FRAME);

      return;
    }

    (animations()).restart();

    hero.alpha = 0;
  }

  function onUnmount() { }

  useEffect(() => {
    onMount();

    return onUnmount;
  });

  const renderer = (): IBackgorund.RendererState => [
    [hero] as IBackgorund.Graphics
  ];

  return (
    <WebGL
      className='background'
      height={height}
      renderer={renderer}
      width={width}
    />
  );
};

backfill.beginFill(MASK_FILL).drawRect(0, 0, innerWidth, innerHeight).endFill();

hero.mask = mask;

hero.addChild(backfill);
hero.addChild(image);

// image.filters = [
//   new Engine.filters.SimpleLightmapFilter()
// ]

export default Background;
