if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

export default globalThis.URLPattern;
