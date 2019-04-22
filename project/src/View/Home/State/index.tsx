import { asyncReducers, connect } from '@Core/State';
import { IMapStateToProps } from "./spec";
import { Dispatch } from "redux";

import windowSizes from './windowSizes';

const reducers = {
  ...windowSizes.reducers
};

const mapStateToProps = (state: IMapStateToProps) => ({
  ...windowSizes.mapStateToProps(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...windowSizes.mapDispatchToProps(dispatch)
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

asyncReducers(reducers);

export { connector };
