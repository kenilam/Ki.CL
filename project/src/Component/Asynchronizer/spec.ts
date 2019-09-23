import ICSSTransition from "@/Component/CSSTransition/spec";

declare module IAsynchronizer {
  interface ClassNames extends IClassNames {
    delay: string;
  }
  
  type Data = any;
  type UpdateData = (Data: Data) => void;
  type DataState = [Data, UpdateData];
  
  type awaitFor = string;
  
  interface Props {
    awaitFor: awaitFor,
    children: (data: Data) => React.ReactNode,
    transitionStyle?: ICSSTransition.TransitionStyle
  }
}

export default IAsynchronizer;
