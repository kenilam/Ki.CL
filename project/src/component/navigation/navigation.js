'use strict';

const Link = ReactRouter.Link;

class Navigation extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <nav className='navigation'>
        <ul>
          { this.props.list.map((item, key) => {
              return <li key={ key }>
                       <Link to={ item.route } activeClassName='isCurrent'>
                       { item.name }
                       </Link>
                     </li>
            }) }
        </ul>
      </nav>
      );
  }
}

export default Navigation;