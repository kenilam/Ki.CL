const scroll = () => {
  const screen = window.innerHeight;
  const page = document.documentElement.scrollHeight - screen;

  return {
    left: (page - window.scrollY) / screen,
    past: window.scrollY / screen,
  };
};

const ease = (value: number) => {
  const amount = Math.min(1, Math.max(0, value));

  return amount * amount * (3 - 2 * amount);
};

export { ease, scroll };
