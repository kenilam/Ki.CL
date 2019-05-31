declare module Polyfill {
  interface Window {
    fetch?: typeof fetch;
    AbortController?: typeof AbortController;
    IntersectionObserver?: typeof IntersectionObserver;
  }
}

export = Polyfill;
