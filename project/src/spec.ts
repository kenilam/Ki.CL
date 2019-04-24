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
declare module 'intersection-observer';
declare module 'get-transition-duration';
declare module 'promise-polyfill/src/polyfill';
declare module 'react-pure-lifecycle';
declare module 'unfetch/polyfill';
