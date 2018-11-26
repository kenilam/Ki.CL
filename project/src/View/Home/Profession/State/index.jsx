import { connect } from 'react-redux';

import { routes } from 'content/resources';

const { profession } = routes.home.content;

const mapStateToProps = () => ({
  profession
});

const Connector = connect(mapStateToProps);

export { Connector };
