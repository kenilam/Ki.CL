import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { routes } = state.resources;

  return {
    routes: Object.keys(routes)
      .filter(route => route !== 'home')
      .map(route => routes[route])
  };
};

const Connector = connect(mapStateToProps);

export { Connector };
