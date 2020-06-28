declare module Spec {
  interface Window {
    fetch?: typeof fetch;
    AbortController?: typeof AbortController;
    IntersectionObserver?: typeof IntersectionObserver;
  }
}

export default Spec;
