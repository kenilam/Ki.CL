import * as Spec from '@/Component/Transition/spec';
import duration from './duration';

const addEndListener: Spec.Props['addEndListener'] = (node, done) => {
  const waitTime = duration(node);

  node.ontransitionend = null;
  node.ontransitionrun = null;

  if (waitTime === 0) {
    done();
    return;
  }

  window.setTimeout(done, waitTime);
};

export default addEndListener;
