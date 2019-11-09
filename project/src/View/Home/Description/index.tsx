import resources from '$/resources';
import {CSSTransition} from '@/Component';
import IDescription from '@/View/Home/Description/spec';
import classnames from 'classnames';
import React, {useEffect, useState} from 'react';

import Style from './Style';

const {
  description
} = resources;

const Description: React.FunctionComponent<IDescription.Props> = ({
  render
}) => {
  const [index, updateIndex] = useState(0);
  let incrementIndexFrame: number;
  
  function incrementIndex() {
    incrementIndexFrame = window.setTimeout(
      () => {
        updateIndex(index + 1);
      },
      100
    );
  }
  
  useEffect(
    () => () => {
      window.clearTimeout(incrementIndexFrame);
    },
    [index > description.length]
  );
  
  return (
    <p aria-label={description} data-component={Style.default}>
      {(new Array(description.length)).fill(null).map(
        (value, position) => {
          const letter = description[position];
          const className = classnames({
            [Style.lineBreak]: letter === '\n'
          });
          
          return (
            !value && (
              <span key={position} className={className}>
                <CSSTransition
                  in={index >= position && render}
                  onEntering={incrementIndex}
                  type='slideUp'
                >
                  <span>
                    {letter}
                  </span>
                </CSSTransition>
              </span>
            )
          )
        }
      )}
    </p>
  );
};

export default Description;
