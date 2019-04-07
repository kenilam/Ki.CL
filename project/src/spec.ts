interface IClassNames {
  [index: string]: string;
}

declare module '*.scss' {
  const classNames: IClassNames;
  export default classNames;
}

declare module 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
declare module 'intersection-observer';
declare module 'get-transition-duration';
declare module 'promise-polyfill/src/polyfill';
declare module 'unfetch/polyfill';
