import resources from 'content/resources';

const initialState = { resources };

const reducer = {
    resources() {
        return initialState.resources;
    }
};

const mapStateToProps = state => ({
    resources: state.resources
});

export default { mapStateToProps, reducer };
