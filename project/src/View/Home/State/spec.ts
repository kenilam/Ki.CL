export interface IUpdateWindowSizes {
  updateWindowSizes(): null;
}

export interface IWindowSizes {
  windowSizes: {
    height: number;
    width: number;
  }
}

export interface IWindowSizesReducerActions extends IWindowSizes {
  type: string;
}

export interface IMapStateToProps extends IWindowSizes {
}
