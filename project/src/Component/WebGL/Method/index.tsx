import React from "react";
import lifecycle from 'react-pure-lifecycle';

const methods = {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  },
  componentDidMount(): void {
    debugger;
  }
};

export { lifecycle, methods };
export default lifecycle(methods);
