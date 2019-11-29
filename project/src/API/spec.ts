import IAsynchronizer from '@/Component/Asynchronizer/spec';

declare module IApi {
  interface Props<T> {
    children: IAsynchronizer.Children<T>
  }
  
  interface AboutData {
    sections: {
      About: string
    }
  }
}

export default IApi;
