import {CSSUnit, RandomId, RandomNumber} from "@/Helper";
import IPhase from "@/View/Home/Phase/spec";
import React, {useEffect, useState} from 'react';
import Style from "./Style";

const TOGGLE_TIME = 50;
const WAIT_TIME = 4000;

let debounce = TOGGLE_TIME;

const getDistance = (unit: string, center: number, client: number, revert: boolean = false) =>
  (revert ? -1 : 1) * Math.round(CSSUnit(unit) * (center - client) / center * 100) / 100;

const getBoxShadow = (event: MouseEvent, distance: string, color: string, revert: boolean = false) => {
  const X = getDistance(distance, window.innerWidth / 2, event.clientX, revert);
  const Y = getDistance(distance, window.innerHeight / 2, event.clientY, revert);
  
  return (`${X}px ${Y}px 0 ${color}`);
};

const Phase: React.FunctionComponent<IPhase.Props> = ({ words }) => {
  let indexTimer: number;
  const end = words.length;
  const [index, updateIndex] = useState(RandomNumber({start: 0, end}));
  const [next, updateNext] = useState(index);
  const [textShadow, updateTextShadow] = useState<string>(null);
  
  function mouseMoveHandler (event: MouseEvent) {
    const lowerShadow = getBoxShadow(event, Style.lowerShadowDistance, Style.lowerShadowColor);
    const upperShadow = getBoxShadow(event, Style.upperShadowDistance, Style.upperShadowColor, true);
  
    updateTextShadow(`${lowerShadow}, ${upperShadow}`);
  }
  
  useEffect(
    () => {
      indexTimer = window.setTimeout(
        () => {
          updateIndex(index + 1 > end ? 0 : index + 1);
        }, debounce
      );
      
      window.addEventListener('mousemove', mouseMoveHandler);
      
      return () => {
        window.clearTimeout(indexTimer);
        window.removeEventListener('mousemove', mouseMoveHandler);
      }
    }, [index]
  );
  
  useEffect(
    () => {
      if (index === end) {
        updateNext((next + 1) % end);
  
        debounce = WAIT_TIME;
        
        return;
      }
      
      debounce = TOGGLE_TIME;
    }, [textShadow, index]
  );
  
  return (
    <span data-view-component={Style.default} style={{ textShadow }}>
      {
        words.map(
          ({word}, key) => (
            (next + index) % end === key ? (
              <span key={RandomId()}>{word}</span>
            ) : null
          )
        )
      }
    </span>
  )
};

export default Phase;
