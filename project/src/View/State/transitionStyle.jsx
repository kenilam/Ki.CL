const actions = {
  updateTransitionStyle: 'UPDATE_TRANSITION_STYLE'
};

const defaultState = {
  transitionStyle: 'fade'
};

const reducers = {
  transitionStyle(state = defaultState, action) {
    switch (action.type) {
      case actions.updateTransitionStyle:
        return action.transitionStyle;

      default:
        return state;
    }
  }
};

const mapStateToProps = state => ({
  transitionStyle: state.transitionStyle
});

const mapDispatchToProps = dispatch => ({
  updateTransitionStyle(transitionStyle) {
    dispatch({ type: actions.updateTransitionStyle, transitionStyle });
  }
});

export default { mapStateToProps, mapDispatchToProps, reducers };
