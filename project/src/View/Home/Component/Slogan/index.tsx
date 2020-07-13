import resources from '$/resources';
import { RandomId } from '@/Helper';
import Phase from '@/View/Home/Component/Phase';
import { Props, Words } from './spec';
import React from 'react';
import Style from './Style';

const {
  view: {
    home: {
      content,
    },
  },
} = resources;

const slogan = content.slogan as string;

let result: RegExpExecArray;
let index = 0;
let lastPhase: string;

const phasesRegExp = new RegExp(/\[(.+)\]/g);
const wordsRegExp = new RegExp(/[\w\d\s]+/g);
const phases: Words = [];

while ((result = phasesRegExp.exec(slogan)) !== null) {
  const [placeholder, words] = result;

  phases.push(slogan.substr(index, slogan.indexOf(placeholder) - index));
  phases.push(
    words.match(wordsRegExp).map((word) => ({ word, render: false }))
  );

  index = phasesRegExp.lastIndex;

  lastPhase = slogan.substr(index, slogan.length);
}

phases.push(lastPhase);

const Slogan: React.FunctionComponent<Props> = () => {
  return (
    <p data-view-component={Style.default}>
      {phases.map((words) =>
        typeof words === 'string' ? (
          words
        ) : (
          <Phase words={words} key={RandomId()} />
        )
      )}
    </p>
  );
};

export default Slogan;
