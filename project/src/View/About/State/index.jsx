import { connect } from 'react-redux';

import { routes } from 'content/resources';

const resources = routes.about;

const mapStateToProps = () => ({
    ...routes.about
});

const Connector = connect(mapStateToProps);

export { Connector, resources };
