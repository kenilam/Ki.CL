import { windowSize } from 'Helper';

const actions = {
    update: 'UPDATE_WINDOW_SIZE'
};

const reducer = {
    backgroundSize(state = windowSize, action) {
        switch (action.type) {
            case actions.update:
                return windowSize;

            default:
                return state;
        }
    }
};

const mapStateToProps = state => ({
    backgroundSize: state.backgroundSize
});

const mapDispatchToProps = {
    updateBackgroundSize: () => ({
        type: actions.update
    })
};

export default { mapStateToProps, mapDispatchToProps, reducer };
