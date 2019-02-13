import {
  className,
  enterDoneClassName,
  exitDoneClassName,
  stylePrefix
} from 'Component/CSSTransition/style.scss';
import { style as fade } from 'Component/CSSTransition/fade.scss';
import { style as slide } from 'Component/CSSTransition/slide.scss';
import { style as slidedown } from 'Component/CSSTransition/slidedown.scss';
import { style as slideup } from 'Component/CSSTransition/slideup.scss';

function add (node) {
  if (!node) {
    return;
  }

  node.classList.add(className);
}

function remove (node) {
  if (!node) {
    return;
  }

  node.classList.remove(
    className,
    enterDoneClassName,
    exitDoneClassName,
    `${stylePrefix}${fade}`,
    `${stylePrefix}${slide}`,
    `${stylePrefix}${slidedown}`,
    `${stylePrefix}${slideup}`
  );
}

export default { add, remove }
