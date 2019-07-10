import resources from '$/resources';
import {withRouter} from '@/Component/Router';
import WebGL from '@/Component/WebGL';
import {CSSUnit} from '@/Helper';
import {WindowSizes} from '@/Hook';
import React, {useEffect} from 'react';
import Gallery from './Gallery';
import {BackFill, Mask, Name, Slogan} from './Partial';
import * as IWebGL from './spec';
import Style from './Style';
import Tween, {gsap} from './Tween';

const {view: {home: {path}}} = resources;

const delay = CSSUnit(Style.delay) / 1000;
const duration = CSSUnit(Style.duration) / 1000;

const backFill = new BackFill();
const gallery = new Gallery();
const mask = new Mask();
const name = new Name();
const slogan = new Slogan();

const render = (): IWebGL.Render => ([
  [backFill, gallery, mask, name, slogan]
]);

let previousWindowSizes = {
  height: window.innerHeight,
  width: window.innerWidth
};

const Graphic: React.FunctionComponent<IWebGL.Props> = (
  {
    history,
    onComplete
  }
) => {
  const isActiveRoute = history.location.pathname === path;
  
  const {innerHeight: height, innerWidth: width} = window;
  
  const windowSizesChanged = () => {
    const {
      height: previousHeight,
      width: previousWidth
    } = previousWindowSizes;
    
    return previousHeight !== height || previousWidth !== width
  };
  
  const reset = () => {
    if (mask.alpha >= 1) {
      return;
    }
    
    gallery.update({x: width / 2, y: height / 2});
    mask.update({x: width / 2, y: height / 2});
    name.update();
    slogan.update();
  };
  
  const resize = () => {
    backFill.update({alpha: 1, height, width});
    
    if (!windowSizesChanged() || mask.alpha === 0) {
      return;
    }
    
    gallery.update({alpha: 1, height: height, width: width});
    mask.update({alpha: 1, height: height, width: width});
    name.update({alpha: 1, height, width, y: -name.height});
    slogan.update({alpha: 1, height, width, y: -slogan.height});
    
    previousWindowSizes = {height, width};
  };
  
  const tween = new gsap.TimelineMax({
    paused: true,
    onComplete,
    onReverseComplete: onComplete
  });
  
  const animateIn = () => {
    if (mask.alpha >= 1) {
      return;
    }
    
    tween.restart(true);
  };
  
  const animateOut = () => {
    if (isActiveRoute) {
      return;
    }
    
    tween.reverse(0);
  };
  
  [
    new Tween({
      duration: 0,
      onUpdate() {
        gallery.update({height, width});
        mask.update({x: width / 2, y: height / 2});
        name.update();
        slogan.update();
      },
      pause: false
    }),
    new Tween({
      delay: duration * 0.1,
      duration: duration * 0.1,
      ease: gsap.Linear.easeNone,
      onUpdate({value: alpha}) {
        mask.update({
          alpha,
          height: height * alpha,
          width: width / 20 * alpha,
          x: width / 2 - width / 40 * alpha,
          y: height / 2 - height / 2 * alpha
        });
      },
      pause: false
    }),
    new Tween({
      duration: duration * 0.2,
      ease: gsap.Back.easeOut,
      onUpdate({value: alpha}) {
        mask.update({
          alpha: 1,
          height: height,
          width: width * alpha,
          x: width / 2 - width / 2 * alpha
        });
      },
      pause: false
    }),
    new Tween({
      duration: duration * 0.4,
      ease: gsap.Back.easeOut,
      onUpdate({value: alpha}) {
        slogan.update({alpha, height, width, y: -slogan.height});
      },
      pause: false
    }),
    new Tween({
      duration: duration * 0.3,
      ease: gsap.Expo.easeIn,
      onUpdate({value: alpha}) {
        name.update({alpha, height, width, y: -name.height});
      },
      pause: false
    }),
    new Tween({
      duration: duration * 0.3,
      ease: gsap.Expo.easeIn,
      onUpdate({value: alpha}) {
        gallery.update({alpha, height, width});
      },
      pause: false
    })
  ].forEach(
    ({sequence}) => {
      tween.add(sequence);
    }
  );
  
  WindowSizes();
  
  useEffect(() => {
    resize();
    animateIn();
    animateOut();
    
    return () => {
      reset();
      tween.kill();
    };
  });
  
  tween.delay(delay);
  
  return (
    <WebGL className={Style.default} height={height} width={width} render={render} />
  )
};

backFill.mask = mask;

export default withRouter(Graphic);
