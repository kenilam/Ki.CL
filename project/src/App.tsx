import * as React from "react";

import State from "./State";

import "./style";

const appRoot = document.querySelector("[app-root]");

interface IProps {}
interface IState {}

class App extends React.PureComponent<IProps, IState> {
  public static getDerivedStateFromError(errors: any) {
    return { errors };
  }

  public componentDidCatch(errors: any, info: any) {
    debugger;
    console.error(errors, info);
  }

  public render() {
    return (
      <State>
        <div>hello world</div>
      </State>
    );
  }
}

export { appRoot };
export default App;
