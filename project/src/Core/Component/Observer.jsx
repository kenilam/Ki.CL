const options = {
  threshold: 1
};

const Observer = handler => new IntersectionObserver(handler, options);

export default Observer;
