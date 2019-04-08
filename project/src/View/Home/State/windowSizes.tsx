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
    console.log(height);
    
    dispatch({type: actions.updateWindowSizes, windowSizes: {height, width}});
  }
});

const mapStateToProps = ({windowSizes}: IWindowSizes) => ({
  windowSizes
});

const reducers = {
  windowSizes(currentWindowSizes = defaultState.windowSizes, {type, windowSizes}: IWindowSizesReducerActions) {
    switch (type) {
      case actions.updateWindowSizes:
        return windowSizes;
      
      default:
        return currentWindowSizes;
    }
  }
};

export default {mapDispatchToProps, mapStateToProps, reducers};
