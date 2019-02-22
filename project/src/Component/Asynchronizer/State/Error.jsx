const actions = {
    catchError: 'CATCH_ERROR'
};

const defaultState = false;

const reducers = {
    error(state = defaultState, { error, type }) {
        switch (type) {
            case actions.catchError:
                return error;

            default:
                return state;
        }
    }
};

const mapStateToProps = ({ error }) => ({ error });

const mapDispatchToProps = dispatch => ({
    catchError(error) {
        dispatch({ type: actions.catchError, error });
    }
});

export default { mapStateToProps, mapDispatchToProps, reducers };
