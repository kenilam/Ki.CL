import * as Polyfill from './spec';

const {
  IntersectionObserver,
  AbortController,
  fetch: Fetch
}: Polyfill.Window = window;

async function loadPolyfill(): Promise<any> {
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
      const smoothScroll = await import('smoothscroll-polyfill');
      
      smoothScroll.polyfill();
    }
  } catch (error) {
    console.error(error);
  }
}

export {loadPolyfill};
