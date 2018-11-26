const actions = {
  updateStyle : 'UPDATE_STYLES'
}

const reducer = {
  style(state = {}, action) {
    switch (action.type) {
      case actions.updateStyle:
        return action.style;

      default:
        return state;
    }
  }
};

const mapStateToProps = state => ({
  style: state.style
});

const mapDispatchToProps = dispatch => ({
  updateStyle(style) {
    dispatch({ type: actions.updateStyle, style });
  }
});

export default { mapStateToProps, mapDispatchToProps, reducer };
