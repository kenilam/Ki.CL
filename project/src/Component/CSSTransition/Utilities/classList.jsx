import { className, enterDoneClassName, exitDoneClassName } from "Component/CSSTransition/style.scss";

function add (node) {
  if (!node) {
    return;
  }

  node.classList.add(className);
}

function remove (node, transitionStyle) {
  if (!node) {
    return;
  }

  node.classList.remove(
    className,
    enterDoneClassName,
    exitDoneClassName,
    `${className}-style-${transitionStyle}`
  );
}

export default { add, remove }
