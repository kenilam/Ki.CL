import { connect } from 'react-redux';

const mapStateToProps = state => {
    const { routes, siteName } = state.resources;

    return {
        ...routes.home,
        siteName
    };
};

const Connector = connect(mapStateToProps);

export { Connector };
