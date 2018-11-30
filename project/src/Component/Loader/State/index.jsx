import { connect } from 'react-redux';

import { component } from 'content/resources';

const { content } = component.loader;

const mapStateToProps = () => ({
  content
});

const Connector = connect(mapStateToProps);

export { Connector };
