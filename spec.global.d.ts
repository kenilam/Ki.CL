type ClassNames<T extends string> = {
  [name in T]: string;
};

declare module '*.scss' {
  const classNames: ClassNames<string>;
  export = classNames;
}

declare module '*.css' {
  const classNames: ClassNames<string>;
  export = classNames;
}

declare module '*.json' {
  const value: void;

  export = value;
}

declare module '*.md' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.svg' {
  const value: string;
  export = value;
}

declare module 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
declare module 'bandcamp-scraper';
declare module 'get-transition-duration';
declare module 'intersection-observer' {
  export function search(): Promise<void>;
}
declare module 'promise-polyfill/src/polyfill';
declare module 'react-audio-player';
declare module 'react-pure-lifecycle';
declare module 'unfetch/polyfill';

declare module 'units-css' {
  export function parse(s: number | string): {
    value: number;
    unit: string;
  };

  export function convert(
    BASE_UNIT: string,
    values: string | number,
    htmlBodyElement?: HTMLBodyElement
  ): number;
}
