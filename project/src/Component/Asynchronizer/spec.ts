declare module IAsynchronizer {
  interface ClassNames extends IClassNames {
    delay: string;
  }
  
  type IsLoading = boolean;
  type StillLoading = (isLoading: IsLoading) => void;
  type LoadingState = [IsLoading, StillLoading];
  
  type SpinnerRemoved = boolean;
  type removeSpinner = (remove: SpinnerRemoved) => void;
  type SpinnerState = [SpinnerRemoved, removeSpinner];
  
  type awaitFor = string;
  
  interface Props {
    awaitFor: awaitFor
  }
}

export default IAsynchronizer;
