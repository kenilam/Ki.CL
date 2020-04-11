type IClassNames<T extends string> = {
  [name in T]: string;
};

declare module '*.scss' {
  const classNames: IClassNames<string>;
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
  export function search(): Promise<any>;
}
declare module 'promise-polyfill/src/polyfill';
declare module 'react-audio-player';
declare module 'react-pure-lifecycle';
declare module 'unfetch/polyfill';
declare module 'units-css' {
  export function parse(
    s: string
  ): {
    value: number;
    unit: string;
  };

  export function convert(
    BASE_UNIT: string,
    values: any,
    htmlBodyElement?: HTMLBodyElement
  ): number;
}
declare module 'webgl-noise';
