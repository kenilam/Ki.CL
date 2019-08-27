declare module IAsynchronizer {
  type IsLoading = boolean;
  type StillLoading = (isLoading: boolean) => void;
  type LoadingState = [IsLoading, StillLoading];
  
  type awaitFor = Promise<any>;
  
  interface Props {
    awaitFor: awaitFor
  }
}

export default IAsynchronizer;
