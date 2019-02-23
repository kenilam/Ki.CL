const actions = {
  updateCurrentItem: 'UPDATE_CURRENT_ITEM'
};

const defaultState = {
  currentItem: 'fade'
};

const reducers = {
  currentItem(state = defaultState, action) {
    switch (action.type) {
      case actions.updateCurrentItem:
        return action.currentItem;

      default:
        return state;
    }
  }
};

const mapStateToProps = state => ({
  currentItem: state.currentItem
});

const mapDispatchToProps = dispatch => ({
  updateCurrentItem(currentItem) {
    dispatch({ type: actions.updateCurrentItem, currentItem });
  }
});

export default { mapStateToProps, mapDispatchToProps, reducers };
