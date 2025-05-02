// @ts-expect-error: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

// @ts-expect-error: Property 'UrlPattern' does not exist
export default globalThis.URLPattern;
