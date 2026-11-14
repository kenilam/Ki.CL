const QUIET = 160;

const whenIdle = (run: () => void) => {
  let timer = 0;

  const finish = () => {
    window.removeEventListener('scroll', restart);
    run();
  };

  const restart = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(finish, QUIET);
  };

  window.addEventListener('scroll', restart, { passive: true });
  restart();

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener('scroll', restart);
  };
};

export { whenIdle };
