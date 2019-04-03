import {Window} from './spec';

async function loadPolyfill(): Promise<any> {
  try {
    if (typeof (window as Window).AbortController === 'undefined') {
      await import('abortcontroller-polyfill/dist/polyfill-patch-fetch');
    }
    
    if (typeof (window as Window).IntersectionObserver === 'undefined') {
      await import('intersection-observer');
    }
    
    if (typeof (window as Window).Promise === 'undefined') {
      await import('promise-polyfill/src/polyfill');
    }
    
    if (typeof (window as Window).fetch === 'undefined') {
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
