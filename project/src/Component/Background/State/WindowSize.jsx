import { windowSize } from 'Helper';

const actions = {
    update: 'UPDATE_WINDOW_SIZE'
};

const reducer = {
    windowSize(state = windowSize, action) {
        switch (action.type) {
            case actions.update:
                return windowSize;

            default:
                return state;
        }
    }
};

const mapStateToProps = state => ({
    windowSize: state.windowSize
});

const mapDispatchToProps = {
    updateWindowSize: () => ({
        type: actions.update
    })
};

export default { mapStateToProps, mapDispatchToProps, reducer };
