/** Read once by each part: a change mid-session isn't worth a listener. */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  );
}

export { prefersReducedMotion };
