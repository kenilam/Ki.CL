import WebGL from '@Component/WebGL';
import {windowSizes} from '@Hook';
import * as IWindowSizes from "@Hook/WindowSizes/spec";
import React, {useEffect} from 'react';
import {ANIMATION_VALUES} from './Animator';
import {container, draw, updater} from './Graphic';
import * as IBackgorund from "./spec";
import Style from './Style';

let prevSizes: IWindowSizes.Values = {height: window.innerHeight, width: window.innerWidth};

let animation: IBackgorund.Animator.Sequence;

const renderer = (): IBackgorund.Renderer => [
  [container]
];

const Background: React.FC<IBackgorund.Props> = ({zoomIn}) => {
  const {sizes: {height, width}} = windowSizes();
  
  function onMount() {
    if (animation) {
      animation.kill();
    }
    
    animation = draw();
    
    if (prevSizes.height !== height || prevSizes.width !== width) {
      updater(ANIMATION_VALUES.ZOOMIN());
      
      prevSizes = {height, width};
      
      return;
    }
    
    if (zoomIn) {
      animation.restart(true);
      
      return;
    }
    
    animation.reverse();
  }
  
  useEffect(() => {
    onMount();
  });
  
  return (
    <WebGL
      className={Style.default}
      height={window.innerHeight}
      renderer={renderer}
      width={window.innerWidth}
    />
  );
};

export default Background;
