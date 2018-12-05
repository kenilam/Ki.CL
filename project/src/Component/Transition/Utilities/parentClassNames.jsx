import { debounce } from 'Core/Utilities';

import duration from './duration';

import * as classNames from './classNames';

const contains = node => node && node.parentNode ? node.parentNode.classList.contains(classNames.parent) : false;

const add = node => {
  if (!node) {
    return;
  }

  if ( contains(node) ) {
    return;
  }

  node.parentNode.classList.add(classNames.parent);
}

const remove = async node => {
  if (!node) {
    return;
  }

  if ( !contains(node) ) {
    return;
  }
  
  await debounce(duration(node));

  node.parentNode.classList.remove(classNames.parent);
}

const toggle = node => {
  if (!node) {
    return;
  }

  if ( contains(node) ) {
    remove(node);

    return;
  }

  add(node);
}

export default { add, remove, toggle };
