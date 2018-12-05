const parent = 'transition';

const node = 'css-transition';

const element = `${node}-element`;

const enter = `${node}-enter`;
const entered = `${enter}-done`;
const exit = `${node}-exit`;
const exited = `${exit}-done`;

const allSelectors = [
  `.${enter}`,
  `.${exit}`,
  `.${enter} > .${element}`,
  `.${exit} > .${element}`
].join(',');

export { allSelectors, element, enter, entered, exit, exited, node, parent }
