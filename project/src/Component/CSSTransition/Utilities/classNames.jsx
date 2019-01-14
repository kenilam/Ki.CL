const base = 'css-transition';
const element = `${base}-element`;

const enter = `${base}-enter`;
const entered = `${enter}-done`;

const exit = `${base}-exit`;
const exited = `${exit}-done`;

const transitionStylePrefix = `${base}-style-`;
const transitionStyle = 'fade';

const all = [
  `.${enter}`,
  `.${enter} > .${element}`,
  `.${exit}`,
  `.${exit} > .${element}`
].join(',');

export default {
  all,
  base,
  element,
  enter,
  entered,
  exit,
  exited,
  transitionStylePrefix,
  transitionStyle
};
