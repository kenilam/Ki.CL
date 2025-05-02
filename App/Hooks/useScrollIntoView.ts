const OPTION: globalThis.ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
};

const useScrollIntoView = (option?: typeof OPTION) => {
  const scrollIntoView = <Node extends HTMLElement | null>(node: Node) => {
    node?.scrollIntoView({
      ...OPTION,
      ...option,
    });
  };

  return { scrollIntoView };
};

export { OPTION };
export default useScrollIntoView;
