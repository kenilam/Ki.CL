import { connect } from 'react-redux';

import { routes } from 'content/resources';

const resources = routes.home;

const mapStateToProps = () => ({
    routes: Object.keys(routes)
        .filter(name => name !== 'home')
        .map(route => routes[route]),
    ...routes.home
});

const Connector = connect(mapStateToProps);

export { Connector, resources };
