import History from "@Core/History";
import * as React from "react";
import lifecycle from 'react-pure-lifecycle';

const staticMethods = {
  getDerivedStateFromError(error: Error) {
    return {error};
  }
};

const methods = {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  },
  componentDidMount(): void {
    History.create();
  },
  componentWillUnmount(): void {
    History.remove();
  }
};

export {lifecycle, methods, staticMethods};
export default lifecycle(methods);
