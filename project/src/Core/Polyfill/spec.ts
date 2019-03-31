export interface Window {
  fetch?: typeof fetch;
  AbortController?: typeof AbortController;
  IntersectionObserver?: typeof IntersectionObserver;
  Promise?: typeof Promise;
}
