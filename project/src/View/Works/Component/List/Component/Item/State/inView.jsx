const actions = {
  updateInView: 'UPDATE_IN_VIEW'
};

const defaultState = {
  inView: []
};

const mapDispatchToProps = dispatch => ({
  updateInView(inView, path) {
    dispatch({ type: actions.updateInView, inView, path });
  }
});

const mapStateToProps = state => ({
  inView: state.inView
});

const reducers = {
  inView(list = defaultState.inView, { type, inView, path }) {
    switch (type) {
      case actions.updateInView:
        list = list.filter(string => string !== path);

        if (inView && !list.indexOf(path) > -1) {
          return [...list, path];
        }

        return list;

      default:
        return list;
    }
  }
};

export default { mapDispatchToProps, mapStateToProps, reducers };
