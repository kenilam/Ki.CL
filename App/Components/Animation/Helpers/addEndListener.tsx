import React from 'react';

// Libraries
import { CSSUnit } from '@/Helper';
import { EndHandler } from 'react-transition-group/Transition';

const addEndListener: (
  node: React.RefObject<HTMLElement | null>
) => EndHandler<HTMLElement> = (node) => (done) => {
  if (!node.current) {
    done();
  }

  const computedStyle = window.getComputedStyle(node.current as HTMLElement);

  const transitionDuration = CSSUnit({
    values: computedStyle.transitionDuration,
  });
  const transitionDelay = CSSUnit({
    values: computedStyle.transitionDelay,
  });

  const wait = transitionDuration + transitionDelay;

  if (!wait) {
    done();

    return;
  }

  node.current?.addEventListener('transitionend', done);
};

export default addEndListener;
