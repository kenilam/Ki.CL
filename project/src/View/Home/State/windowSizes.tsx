import {Dispatch} from "redux";
import {IWindowSizes, IWindowSizesReducerActions} from "./spec";

const actions = {
  updateWindowSizes: 'UPDATE_WINDOW_SIZE'
};

const {innerHeight: height, innerWidth: width} = window;

const defaultState: IWindowSizes = {
  windowSizes: {height, width}
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateWindowSizes() {
    const {innerHeight: height, innerWidth: width} = window;
    
    dispatch({type: actions.updateWindowSizes, windowSizes: {height, width}});
  }
});

const mapStateToProps = ({windowSizes}: IWindowSizes) => ({
  windowSizes
});

const reducers = {
  windowSizes(currentWindowSizes = defaultState.windowSizes, {type, windowSizes}: IWindowSizesReducerActions) {
    if (type === actions.updateWindowSizes) {
      return windowSizes;
    }
  
    return currentWindowSizes;
  }
};

export default {mapDispatchToProps, mapStateToProps, reducers};
