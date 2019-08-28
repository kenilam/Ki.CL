interface IClassNames {
  [index: string]: any;
}

declare module '*.scss' {
  const classNames: IClassNames;
  export default classNames;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
declare module 'bandcamp-scraper';
declare module 'get-transition-duration';
declare module 'intersection-observer' {
  export type search = () => Promise<any>;
}
declare module 'promise-polyfill/src/polyfill';
declare module 'react-audio-player';
declare module 'react-pure-lifecycle';
declare module 'unfetch/polyfill';
declare module 'units-css' {
  export function parse (s: string) {
    const value: number;
    const unit: string;
    
    return {value, unit};
  }
  export function convert (
    BASE_UNIT: string,
    values: any,
    htmlBodyElement?: HTMLBodyElement
  ) {
    const value: number;
    return value;
  }
}
declare module 'webgl-noise';
