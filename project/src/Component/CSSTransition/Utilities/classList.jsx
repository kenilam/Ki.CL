import {
  classname,
  enterdoneclassname,
  exitdoneclassname,
  styleprefix
} from 'Component/CSSTransition/style';

function add(node) {
  if (!node) {
    return;
  }

  node.classList.add(classname);
}

function remove(node) {
  if (!node) {
    return;
  }

  node.classList.remove(
    ...Array.from(node.classList).filter(className =>
      className.startsWith(styleprefix)
    ),
    classname,
    enterdoneclassname,
    exitdoneclassname
  );
}

export default { add, remove };
