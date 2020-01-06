declare module IHelper {
  interface Style {
    [name: string]: any;
  }
  
  type Cancel = () => void;
  
  type Fetch = (url: string, options?: RequestInit) =>
    { cancel: Cancel; promise: Promise<unknown> };
}

export default IHelper;
