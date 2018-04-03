import { connect } from 'react-redux';

import { routes } from 'content/resources';

const mapStateToProps = () => ({
    routes: Object.keys(routes).map(route => routes[route])
});

const Connector = connect(mapStateToProps);

export { Connector };
