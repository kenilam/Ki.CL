import { asyncReducers, connect } from 'State';

import inView from './inView';

const reducers = {
  ...inView.reducers
};

const mapStateToProps = state => ({
  ...inView.mapStateToProps(state)
});

const mapDispatchToProps = dispatch => ({
  ...inView.mapDispatchToProps(dispatch)
});

const connecter = connect(
  mapStateToProps,
  mapDispatchToProps
);

asyncReducers(reducers);

export default { connecter };
