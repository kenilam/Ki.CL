if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

const URLPattern = globalThis.URLPattern;

export { URLPattern };
