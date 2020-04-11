import { TransitionClassName } from '@/Component/CSSTransition';
import CSSTransitionStyle from '@/Component/CSSTransition/Core/Style';
import ICSSTransition from '@/Component/CSSTransition/spec';
import TransitionStyle from '@/Component/Transition/Style';

const getTransitionClassNameByType = (type: ICSSTransition.Type) =>
  TransitionClassName[type]
    ? TransitionClassName[type].replace(
        CSSTransitionStyle.default,
        TransitionStyle.default
      )
    : '';

const add = (node: HTMLElement, ...classNames: string[]) => {
  if (node && node.parentElement) {
    window.requestAnimationFrame(() => {
      node.parentElement.classList.add(TransitionStyle.default, ...classNames);
    });
  }
};

const remove = (node: HTMLElement, ...classNames: string[]) => {
  if (node && node.parentElement) {
    window.requestAnimationFrame(() => {
      node.parentElement.classList.remove(
        TransitionStyle.default,
        ...classNames
      );
    });
  }
};

export default { add, getTransitionClassNameByType, remove };
