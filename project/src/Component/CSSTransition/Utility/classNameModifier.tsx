import {className, enterDoneClassName, exitDoneClassName} from '@Component/CSSTransition/Style';
import classnames from 'classnames';
import {CSSTransitionClassNames} from 'react-transition-group/CSSTransition';

const addDefault = (
  node: Element,
  additionalClassNames: string | CSSTransitionClassNames
) => {
  if (!node) {
    return;
  }
  
  node.classList.add(className);
  
  if (!additionalClassNames) {
    return;
  }
  
  node.classList.add(classnames(additionalClassNames));
};

const removeDone = (node: Element) => {
  if (!node) {
    return;
  }
  
  node.classList.remove(enterDoneClassName);
  node.classList.remove(exitDoneClassName);
};

export default {addDefault, removeDone};
