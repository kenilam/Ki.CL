import { connect } from 'react-redux';

import { routes } from 'content/resources';

const resources = routes.projects;

const mapStateToProps = () => ({
    ...routes.projects
});

const Connector = connect(mapStateToProps);

export { Connector, resources };
