import Style from '@Component/CSSTransition/Style';
import classnames from 'classnames';
import {CSSTransitionClassNames} from 'react-transition-group/CSSTransition';

const addDefault = (
  node: Element,
  additionalClassNames: string | CSSTransitionClassNames
) => {
  if (!node) {
    return;
  }
  
  node.classList.add(Style.cssTransition);
  
  if (!additionalClassNames) {
    return;
  }
  
  node.classList.add(classnames(additionalClassNames));
};

const removeDone = (
  node: Element,
  additionalClassNames: string | CSSTransitionClassNames
) => {
  if (!node) {
    return;
  }
  
  node.classList.remove(Style.cssTransition, Style.enterDone, Style.exitDone);
  
  if (!additionalClassNames) {
    return;
  }
  
  node.classList.remove(classnames(additionalClassNames));
};

export default {addDefault, removeDone};
