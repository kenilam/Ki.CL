import data from '$resources/data.json';
import IResources from '$resources/spec';
import {withRouter} from '@Component/Router';
import WebGL from '@Component/WebGL';
import {CSSUnit} from '@Helper';
import {WindowSizes} from '@Hook';
import * as IGraphic from '@View/Home/Graphic/spec';
import React, {useEffect} from 'react';
import {BackFill, Mask, Name, Slogan} from './Partial';
import Style from './Style';
import Tween, {gsap} from './Tween';

const {view: {home: {path}}}: IResources.Data = data;

const delay = CSSUnit(Style.delay) / 1000;
const duration = CSSUnit(Style.duration) / 1000;

const backFill = new BackFill();
const mask = new Mask();
const name = new Name();
const slogan = new Slogan();

const render = (): IGraphic.Render => ([
  [backFill, mask, name, slogan]
]);

let previousWindowSizes = {
  height: window.innerHeight,
  width: window.innerWidth
};

const Graphic: React.FunctionComponent<IGraphic.Props> = ({
  history,
  onComplete
}) => {
  const isActiveRoute = history.location.pathname === path;
  
  const {innerHeight: height, innerWidth: width} = window;
  
  const windowSizesChanged = () => {
    const {
      height: previousHeight,
      width: previousWidth
    } = previousWindowSizes;
    
    return previousHeight !== height || previousWidth !== width
  };
  
  const resize = () => {
    backFill.update({alpha: 1, height, width});
    
    if (!windowSizesChanged() || mask.alpha === 0) {
      return;
    }
    
    mask.update({
      alpha: 1,
      height: height,
      width: width,
      x: width / 2 - width / 2,
      y: height / 2 - height / 2
    });
    name.update({alpha: 1, height, width, y: name.height / 2});
    slogan.update({alpha: 1, height, width, y: -slogan.height / 2});
    
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
      onUpdate({value}) {
        mask.update({
          alpha: 1,
          height: height,
          width: width * value,
          x: width / 2 - width / 2 * value
        });
      },
      pause: false
    }),
    new Tween({
      duration: duration * 0.4,
      ease: gsap.Back.easeOut,
      onUpdate({value: alpha}) {
        slogan.update({alpha, height, width, y: -slogan.height / 2});
      },
      pause: false
    }),
    new Tween({
      duration: duration * 0.3,
      ease: gsap.Expo.easeIn,
      onUpdate({value: alpha}) {
        name.update({alpha, height, width, y: name.height / 2});
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
      tween.kill();
      
      if (mask.alpha < 1) {
        mask.update({x: width / 2, y: height / 2});
        name.update();
        slogan.update();
      }
    };
  });
  
  tween.delay(delay);
  
  return (
    <WebGL className={Style.default} height={height} width={width} render={render} />
  )
};

backFill.mask = mask;

export default withRouter(Graphic);
