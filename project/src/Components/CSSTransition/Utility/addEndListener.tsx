import Spec from "@/Components/CSSTransition/spec";
import duration from "./duration";

const addEndListener: Spec.AddEndListener = (node, done) => {
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
