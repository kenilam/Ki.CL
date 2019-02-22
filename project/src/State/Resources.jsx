import resources from 'content/resources';

const reducers = {
    resources() {
        return resources;
    }
};

const mapStateToProps = state => ({
    resources: state.resources
});

export default { mapStateToProps, reducers };
