declare module IHelper {
  interface Style {
    [name: string]: any;
  }
  
  interface Options {
    body: string;
    method:
      'DELETE' |
      'GET' |
      'HEAD' |
      'PATCH' |
      'POST' |
      'PUT' |
      'OPTIONS'
  }
  
  type Cancel = () => void;
  
  type Fetch = (url: string, options?: Options) =>
    { cancel: Cancel; promise: Promise<unknown> };
}

export default IHelper;
