import resources from '$/resources';
import Phase from "@/View/Home/Phase";
import ISlogan from "@/View/Home/Slogan/spec";
import React from 'react';
import Style from "./Style";

const {
  view: {
    home: {
      content: { slogan }
    }
  }
} = resources;

let result: RegExpExecArray;
let index = 0;
let lastPhase: string;

const phasesRegExp = new RegExp(/\[(.+)\]/g);
const wordsRegExp = new RegExp(/[\w\d\s]+/g);
const phases: ISlogan.Words = [];

while ((result = phasesRegExp.exec(slogan)) !== null) {
  const [placeholder, words] = result;
  
  phases.push(slogan.substr(index, slogan.indexOf(placeholder) - index));
  phases.push(
    words.match(wordsRegExp).map(word => ({ word, render: false }))
  );
  
  index = phasesRegExp.lastIndex;
  
  lastPhase = slogan.substr(index, slogan.length);
}

phases.push(lastPhase);

const Slogan: React.FunctionComponent<ISlogan.Props> = () => {
  return (
    <p data-view-component={Style.default}>
      {
        phases.map(
          words => (
            typeof words === 'string'
              ? words
              : (
                <Phase words={words}/>
              )
          )
        )
      }
    </p>
  )
};

export default Slogan;
