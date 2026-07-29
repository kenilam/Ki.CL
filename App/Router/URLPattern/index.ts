// @ts-expect-error: lib.dom does not declare URLPattern until TS 7
if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

// @ts-expect-error: lib.dom does not declare URLPattern until TS 7
export default globalThis.URLPattern;
