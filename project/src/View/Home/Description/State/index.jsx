import { connect } from 'react-redux';

import { routes } from 'content/resources';

const { description } = routes.home.content;

const mapStateToProps = () => ({
  description
});

const Connector = connect(mapStateToProps);

export { Connector };
