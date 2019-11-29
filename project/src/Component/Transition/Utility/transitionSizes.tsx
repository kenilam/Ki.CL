const set = (node: HTMLElement) => {
  if (!node || !node.parentElement) {
    return;
  }
  
  const {height, width} = node.getBoundingClientRect();
  
  node.parentElement.style.height = `${height}px`;
  node.parentElement.style.width = `${width}px`;
};

const unset = (node: HTMLElement) => {
  if (!node || !node.parentElement) {
    return;
  }
  
  
  node.parentElement.style.height = null;
  node.parentElement.style.width = null;
};

export default { set, unset };
