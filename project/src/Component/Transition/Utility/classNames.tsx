import Style from '@/Component/Transition/Style';

const CLASSNAMES_FILTER_WITHOUT = ['css-transition'];

const CLASSNAMES_FILTER_MATCH = ['appear', 'enter', 'exit'];

const getTransitionType = (node: HTMLElement) =>
  Array.from(node.classList).filter(
    (name) =>
      !CLASSNAMES_FILTER_MATCH.some((search) => name.includes(search)) &&
      !CLASSNAMES_FILTER_WITHOUT.includes(name)
  )[0];

const add = (node: HTMLElement) => {
  if (!node || !node.parentElement) {
    return;
  }

  const onAdd = () => {
    node.parentElement.dataset.transitionType = getTransitionType(node);
    node.parentElement.classList.add(Style.default);
  };

  window.requestAnimationFrame(onAdd);
};

const remove = (node: HTMLElement) => {
  if (!node || !node.parentElement) {
    return;
  }

  const onRemove = () => {
    node.parentElement.removeAttribute('data-transition-type');
    node.parentElement.classList.remove(Style.default);
  };

  window.requestAnimationFrame(onRemove);
};

export default { add, remove };
