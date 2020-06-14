import { EndHandler } from "react-transition-group/Transition";
import duration from "./duration";

const addEndListener: EndHandler = (node, done) => {
  const waitTime = duration(node);

  node.ontransitionend = null;
  node.ontransitionrun = null;

  if (waitTime === 0) {
    node.ontransitionrun = done;
    return;
  }

  node.ontransitionend = done;
};

export default addEndListener;
