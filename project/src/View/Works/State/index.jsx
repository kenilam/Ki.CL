import { connect } from 'react-redux';

import { routes } from 'content/resources';

const resources = routes.works;

const mapStateToProps = () => ({
  ...resources
});

const Connector = connect(mapStateToProps);

export { Connector, resources };
