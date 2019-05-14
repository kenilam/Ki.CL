import WebGL from '@Component/WebGL';
import {windowSizes} from '@Hook';
import * as IWindowSizes from "@Hook/WindowSizes/spec";
import React, {useEffect} from 'react';
import {ANIMATION_PROPERTIES, generator} from './Animator';
import {container, draw} from './Graphic';
import * as IBackgorund from "./spec";
import Style from './Style';

const {innerHeight, innerWidth} = window;

const renderer = (): IBackgorund.Renderer => [
  [container]
];

let prevSizes: IWindowSizes.Values = {height: innerHeight, width: innerWidth};
const Background: React.FC<IBackgorund.Props> = ({zoomIn}) => {
  const {sizes: {height, width}} = windowSizes();
  
  function onMount() {
    const animation = generator(draw);
    
    if (prevSizes.height !== height || prevSizes.width !== width) {
      draw(ANIMATION_PROPERTIES.ZOOMIN());
      
      prevSizes = {height, width};
      
      return;
    }
    
    if (zoomIn) {
      animation.restart(true);
      
      return;
    }
    
    animation.reverse();
  }
  
  function onUnmount() {
  
  }
  
  useEffect(() => {
    onMount();
    
    return onUnmount();
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
