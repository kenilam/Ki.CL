import resources from 'content/resources';

const reducer = {
    resources() {
        return resources;
    }
};

const mapStateToProps = state => ({
    resources: state.resources
});

export default { mapStateToProps, reducer };
