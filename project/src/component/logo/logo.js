'use strict';

const Link = ReactRouter.Link;

class Logo extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <h1 className='logo'>
      	<Link to='/' activeClassName='isCurrent'>Ki.CL | HOME</Link>
      </h1>
      );
  }
}

export default Logo;