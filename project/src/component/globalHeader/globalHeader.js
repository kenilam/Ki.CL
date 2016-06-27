'use strict';

import { Logo, MenuButton, Navigation } from '@/component/component';

let globaleHeaderTimer;

class GlobaleHeader extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.className = classNames({
      globalHeader: true,
      menuCollapsed: true
    });
  }

  broadcastHeight() {
    window.dispatchEvent(new CustomEvent(
      'globalHeader.height',
      {
        detail: {
          height: $(this._element).outerHeight(true)
        }
      }
    ));
  }

  setClass() {
    this.className = classNames({
      globalHeader: true,
      menuCollapsed: this.state.menuCollapsed
    });

    clearTimeout(this.timer);
    this.timer = setTimeout(this.forceUpdate.bind(this));
  }

  toggleMenu(event) {
    this.setState({
      menuCollapsed: !event.detail.expanded
    }, this.setClass);
  }

  componentWillMount() {
    window.addEventListener('globalHeader.navigation', this.toggleMenu.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('globalHeader.navigation', this.toggleMenu);
  }

  componentDidMount() {
    new ResizeSensor(this._element, this.broadcastHeight.bind(this));

    this.broadcastHeight();
  }

  render() {
    return (
      <header role='banner' className={ this.className } ref={ (ref) => this._element = ref }>
        <Logo/>
        <MenuButton dispatchEvent='globalHeader.navigation' />
        <Navigation list={ [ { name: 'About', route: '/about' }, { name: 'Work', route: '/work' } ] } />
      </header>
      );
  }
}

export default GlobaleHeader;