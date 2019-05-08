import WebGL, {Engine, Tween, TweenSequence, gsap} from '@Component/WebGL';
import {windowSizes} from '@Hook';
import React, {useEffect, useState} from 'react';
import * as IBackgorund from "./spec";

const {innerHeight, innerWidth} = window;

const FRAME = 16;

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
const image = Engine.Sprite.from('/image/london.whitechapel.jpg');
const mask: Engine.Graphics = new Engine.Graphics();

const drawGraphics: IBackgorund.DrawRect = (alpha, x, y, w, h, r) => {
  hero.alpha = alpha;
  
  mask
  .clear()
  .beginFill(MASK_FILL)
  .drawRoundedRect(x, y, w, h, r)
  .endFill();
};

const Background: React.FC<IBackgorund.Props> = () => {
  const [initialRun = true, updateInitialRun]: IBackgorund.InitialRunState = useState<IBackgorund.InitialRun>();
  
  const {sizes: {height, width}} = windowSizes();
  
  function onComplete() { updateInitialRun(false) }
  
  function onUpdate() {
    const { alpha, height, radius, width, x, y } = INITIAL_ANIMATION_PROPERTIES;
    
    drawGraphics(alpha, x, y, width, height, radius);
  }
  
  function animations() {
    const sequence = new TweenSequence({ onComplete, onUpdate });
  
    sequence.add(
      Tween.to(INITIAL_ANIMATION_PROPERTIES, 1, {
        alpha: 0.3,
        height: FRAME * 4,
        width: width - (FRAME * 2),
        y: height / 2 - FRAME * 2,
        x: FRAME,
        
        delay: 1,
        ease: gsap.Expo.easeOut,
      })
    );
  
    sequence.add(
      Tween.to(INITIAL_ANIMATION_PROPERTIES, 0.5, {
        alpha: 1,
        height: height - (FRAME * 2),
        radius: FRAME,
        y: FRAME,
        
        ease: gsap.Expo.easeInOut,
      })
    );
    
    sequence.delay(1);
    sequence.pause();
    
    return sequence;
  }
  
  function onMount() {
    backfill.drawRect(0, 0, width, height);
  
    image.width = width * (width > height ? 1 : height / width);
    image.height = height * (height > width ? 1 : width / height);
    image.x = (width - image.width) / 2;
    image.y = (height - image.height) / 2;
    
    if (!initialRun) {
      drawGraphics(1, FRAME, FRAME, width - (FRAME * 2), height - (FRAME * 2), FRAME);
      
      return;
    }
  
    (animations()).restart();
    
    hero.alpha = 0;
  }
  
  function onUnmount() {}
  
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

image.filters = [
  new Engine.filters.CrossHatchFilter()
];

export default Background;
