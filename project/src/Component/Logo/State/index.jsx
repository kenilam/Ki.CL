import { connect } from 'react-redux';

import { routes, siteName } from 'content/resources';

const mapStateToProps = () => ({
    ...routes.home,
    siteName
});

const Connector = connect(mapStateToProps);

export { Connector };
