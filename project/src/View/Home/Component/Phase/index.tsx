import { RandomId, RandomNumber } from '@/Helper';
import { Props } from './spec';
import React, { useEffect, useState } from 'react';
import Style from './Style';

const TOGGLE_TIME = 150;
const WAIT_TIME = 4000;

let debounce = TOGGLE_TIME;

const Phase: React.FunctionComponent<Props> = ({ words }) => {
  let indexTimer: number;
  const end = words.length;
  const [index, updateIndex] = useState(RandomNumber({ start: 0, end }));
  const [next, updateNext] = useState(index);

  useEffect(() => {
    indexTimer = window.setTimeout(() => {
      updateIndex(index + 1 > end ? 0 : index + 1);
    }, debounce);

    return () => {
      window.clearTimeout(indexTimer);
    };
  }, [index]);

  useEffect(() => {
    if (index === end) {
      updateNext((next + 1) % end);

      debounce = WAIT_TIME;

      return;
    }

    debounce = TOGGLE_TIME;
  }, [index]);

  return (
    <span data-view-component={Style.default}>
      {words.map(({ word }, key) =>
        (next + index) % end === key ? (
          <span key={RandomId()}>{word}</span>
        ) : null
      )}
    </span>
  );
};

export default Phase;
