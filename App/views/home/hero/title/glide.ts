const DURATION = 1000;

const ease = (progress: number) => {
  if (progress < 0.5) {
    return 4 * progress ** 3;
  }

  return 1 - (-2 * progress + 2) ** 3 / 2;
};

const glide = (top: number, signal: AbortSignal) => {
  const from = window.scrollY;
  const start = performance.now();

  const step = (now: number) => {
    if (signal.aborted) {
      return;
    }

    const progress = Math.min((now - start) / DURATION, 1);

    window.scrollTo({
      behavior: 'instant',
      top: from + (top - from) * ease(progress),
    });

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

export { glide };
