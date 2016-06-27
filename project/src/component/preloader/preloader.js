'use strict';

class Preloader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <p className='preloader'>
        <i className='fa fa-spin fa-cog'></i>
        <span>Loading...</span>
      </p>
      );
  }
}

export default Preloader;