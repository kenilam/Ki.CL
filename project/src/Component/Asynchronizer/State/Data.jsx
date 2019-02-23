const actions = {
  updateData: 'UPDATE_DATA'
};

const defaultState = [];

const reducers = {
  data(state = defaultState, { data, type }) {
    switch (type) {
      case actions.updateData:
        return data;

      default:
        return state;
    }
  }
};

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = dispatch => ({
  updateData(data) {
    dispatch({ type: actions.updateData, data });
  }
});

export default { mapStateToProps, mapDispatchToProps, reducers };
