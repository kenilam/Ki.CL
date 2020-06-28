import Polyfill from './spec';

const {
  IntersectionObserver,
  AbortController,
  fetch: Fetch,
}: Polyfill.Window = window;

async function loadPolyfill(): Promise<void> {
  let smoothScroll: { polyfill(): void } | null;

  try {
    if (typeof AbortController === 'undefined') {
      await import('abortcontroller-polyfill/dist/polyfill-patch-fetch');
    }

    if (typeof IntersectionObserver === 'undefined') {
      await import('intersection-observer');
    }

    if (typeof Fetch === 'undefined') {
      await import('unfetch/polyfill');
    }

    if (!('scrollBehavior' in document.documentElement.style)) {
      smoothScroll = await import('smoothscroll-polyfill');

      smoothScroll.polyfill();
    }
  } catch (error) {
    throw new Error(error);
  }
}

export { loadPolyfill };
