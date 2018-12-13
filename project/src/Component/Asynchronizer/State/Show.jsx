const actions = {
  showComponent: 'SHOW_COMPONENT'
}

const defaultState = false;

const reducers = {
  show(state = defaultState, { show, type }) {
    switch (type) {
      case actions.showComponent:
        return show;

      default:
        return state;
    }
  }
};

const mapStateToProps = ({ show }) => ({ show });

const mapDispatchToProps = dispatch => ({
  showComponent(show = true) {
    dispatch({ type: actions.showComponent, show });
  }
});

export default { mapStateToProps, mapDispatchToProps, reducers };
