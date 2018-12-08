import { duration } from 'Component/CSSTransition';
import { debounce } from 'Helper';

const base = 'transition';

const exist = node => node && node.parentNode;

const contains = node => exist(node) && node.parentNode.classList.contains(base);

const add = node => {
  if (contains(node)) {
    return;
  }

  node.parentNode.classList.add(base);
}

const remove = async node => {
  await debounce( duration(node) );

  if (!exist(node)) {
    return;
  }

  node.parentNode.classList.remove(base);
}

const toggle = async node => {
    if (contains(node)) {
        await remove(node);

        return;
    }

    add(node);
}

export default { base, add, remove, toggle };
