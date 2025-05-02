import React from 'react';

// Libraries
import { CSSUnit } from '@/Helper';
import { EndHandler } from 'react-transition-group/Transition';

const addEndListener: (
  node: React.RefObject<HTMLDivElement | null>
) => EndHandler<HTMLDivElement> = (node) => (done) => {
  if (!node.current) {
    done();
  }

  const transitionDuration = CSSUnit({
    values: window.getComputedStyle(node.current as HTMLDivElement)
      .transitionDuration,
  });
  const transitionDelay = CSSUnit({
    values: window.getComputedStyle(node.current as HTMLDivElement)
      .transitionDelay,
  });

  const wait = transitionDuration + transitionDelay;

  window.setTimeout(done, wait);
};

export default addEndListener;
