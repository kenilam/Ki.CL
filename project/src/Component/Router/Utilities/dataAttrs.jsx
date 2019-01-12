import { notationise } from './path';

const dataAttrs = (name, location) => {
  document.body.dataset[`${name}Routes`] = notationise(location);
}

export default dataAttrs;
